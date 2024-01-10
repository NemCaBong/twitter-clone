import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getExtensionFromFullname, getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import path from 'path'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Other'
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
}

const mediasService = new MediaService()
export default mediasService