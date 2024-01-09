import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getExtensionFromFullname, getNameFromFullname, handleUploadSingleImage } from '~/utils/file'
import path from 'path'
import fs from 'fs'
import { isProduction } from '~/constants/config'
import { config } from 'dotenv'
config()
class MediaService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newFileName = getNameFromFullname(file.newFilename)
    const newFileExtension = getExtensionFromFullname(file.newFilename)
    const filePath = path.resolve(UPLOAD_DIR, `${newFileName}.${newFileExtension}`)
    sharp.cache(false)
    // convert to jpeg
    await sharp(file.filepath).jpeg().toFile(filePath)
    // xóa file trong temp
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${process.env.HOST}/static/image/${newFileName}.${newFileExtension}`
      : `http://localhost:${process.env.PORT}/static/image/${newFileName}.${newFileExtension}`
  }
}

const mediasService = new MediaService()
export default mediasService
