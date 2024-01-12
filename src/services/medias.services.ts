import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getExtensionFromFullname, getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import path from 'path'
import fs from 'fs'
import fsPromise from 'fs/promises'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
import { encodeHLSWithMultipleVideoStreams } from '~/utils/video'

config()
class MediaService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)

    // Promise.all để tiết kiệm thời gian
    const result = await Promise.all(
      files.map(async (file) => {
        const newFileName = getNameFromFullname(file.newFilename)
        const newFileExtension = getExtensionFromFullname(file.newFilename)
        const filePath = path.resolve(UPLOAD_IMAGE_DIR, `${newFileName}.${newFileExtension}`)
        sharp.cache(false)
        // convert to jpeg
        await sharp(file.filepath).jpeg().toFile(filePath)
        // xóa file trong temp
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newFileName}.${newFileExtension}`
            : `http://localhost:${process.env.PORT}/static/image/${newFileName}.${newFileExtension}`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = files.map((file) => {
      return {
        url: isProduction
          ? `${process.env.HOST}/static/video/${file.newFilename}`
          : `http://localhost:${process.env.PORT}/static/video/${file.newFilename}`,
        type: MediaType.Video
      }
    })
    return result
  }

  async uploadHLSVideo(req: Request) {
    const files = await handleUploadVideo(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        await encodeHLSWithMultipleVideoStreams(file.filepath)
        await fsPromise.unlink(file.filepath)
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
}

const mediasService = new MediaService()
export default mediasService
