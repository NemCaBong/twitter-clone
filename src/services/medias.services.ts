import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/file'
import path from 'path'
import fs from 'fs'

class MediaService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newFileName = getNameFromFullname(file.newFilename)
    const filePath = path.resolve(UPLOAD_DIR, `${newFileName}.jpeg`)
    sharp.cache(false)
    // convert to jpeg
    await sharp(file.filepath).jpeg().toFile(filePath)
    // xóa file trong temp
    fs.unlinkSync(file.filepath)
    return `http://localhost:3000/uploads/${newFileName}.jpeg`
  }
}

const mediasService = new MediaService()
export default mediasService
