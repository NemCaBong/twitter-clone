import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import {
  getExtensionFromFullname,
  getFilesFromDir,
  getNameFromFullname,
  handleUploadImage,
  handleUploadVideo
} from '~/utils/file'
import path from 'path'

import fsPromise from 'fs/promises'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
import { EncodingStatus, MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { encodeHLSWithMultipleVideoStreams } from '~/utils/video'
import databaseService from './database.services'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import { uploadFileToS3 } from '~/utils/s3'
import mime from 'mime'
import { rimrafSync } from 'rimraf'

config()

class Queue {
  items: string[]
  encoding: boolean
  constructor() {
    this.items = []
    this.encoding = false
  }

  async enqueue(item: string) {
    // item ở đây chính là filePath của video
    this.items.push(item)
    const idName = getNameFromFullname(path.basename(item))
    await databaseService.videoStatus.insertOne(new VideoStatus({ name: idName, status: EncodingStatus.Pending }))
    // thêm vào queue xong thì gọi processEncode luôn
    this.processEncode()
  }

  async processEncode() {
    // tránh trường hợp nhiều request cùng lúc thực hiện encode
    if (this.encoding) return
    if (this.items.length > 0) {
      this.encoding = true
      const videoPath = this.items[0]
      const idName = getNameFromFullname(path.basename(videoPath))
      console.log('IdName: ', idName)
      // update status = processing
      await databaseService.videoStatus.updateOne(
        { name: idName },
        { $set: { status: EncodingStatus.Processing }, $currentDate: { updated_at: true } }
      )
      try {
        await encodeHLSWithMultipleVideoStreams(videoPath)
        // xóa item trong queue
        this.items.shift()

        console.log(`Encode video ${videoPath} success`)
        // upload all the hls files to s3
        const hlsFiles = getFilesFromDir(path.resolve(UPLOAD_VIDEO_DIR, idName))
        await Promise.all(
          hlsFiles.map((filePath) => {
            // loại bỏ đi đường dẫn đến folder uploads, chỉ để lại tên dir chứa files
            let fileName = 'video-hls' + filePath.replace(UPLOAD_VIDEO_DIR, '')
            // bỏ đi dấu \ trong đường dẫn đối với windows
            fileName = fileName.replace(/\\/g, '/')
            return uploadFileToS3({
              filePath,
              fileName,
              contentType: mime.getType(filePath) as string
            })
          })
        )
        // xóa folder chứa files hls
        rimrafSync(path.resolve(UPLOAD_VIDEO_DIR, idName))
        // update status = completed
        await databaseService.videoStatus.updateOne(
          { name: idName },
          { $set: { status: EncodingStatus.Completed }, $currentDate: { updated_at: true } }
        )
      } catch (error) {
        await databaseService.videoStatus
          .updateOne({ name: idName }, { $set: { status: EncodingStatus.Failed }, $currentDate: { updated_at: true } })
          .catch((err) => console.error('Update video failed: ', err))
        console.error(`Encode video ${videoPath} error`)
        console.error(error)
      }
      this.encoding = false
      this.processEncode()
    } else {
      console.log('Encode video queue is empty')
    }
  }
}

const queue = new Queue()
class MediaService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)

    // Promise.all để tiết kiệm thời gian
    const result = await Promise.all(
      files.map(async (file) => {
        const newFileName = getNameFromFullname(file.newFilename)
        const newFileExtension = getExtensionFromFullname(file.newFilename)
        const newFullFileName = `${newFileName}.${newFileExtension}`
        const filePath = path.resolve(UPLOAD_IMAGE_DIR, newFullFileName)
        sharp.cache(false)
        // convert to jpeg
        await sharp(file.filepath).jpeg().toFile(filePath)

        // upload file to s3
        const s3Result = await uploadFileToS3({
          // tự động tạo folder
          fileName: 'images/' + newFullFileName,
          filePath: filePath,
          contentType: mime.getType(newFullFileName) as string
        })

        Promise.all([fsPromise.unlink(filePath), fsPromise.unlink(file.filepath)])
        return {
          url: s3Result.Location,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)

    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const s3Result = await uploadFileToS3({
          fileName: 'videos/' + file.newFilename,
          filePath: file.filepath,
          contentType: mime.getType(file.filepath) as string
        })
        fsPromise.unlink(file.filepath)
        return {
          url: s3Result.Location as string,
          type: MediaType.Video
        }
      })
    )
    return result
  }

  async uploadHLSVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        // thêm vào hàng đợi để encode
        queue.enqueue(file.filepath)
        const newName = getNameFromFullname(file.newFilename)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/video-hls/${newName}/master.m3u8`
            : `http://localhost:${process.env.PORT}/static/video-hls/${newName}/master.m3u8`,
          type: MediaType.HLS
        }
      })
    )
    return result
  }

  async getVideoStatus(id: string) {
    const data = await databaseService.videoStatus.findOne({
      name: id
    })
    return data
  }
}

const mediasService = new MediaService()
export default mediasService
