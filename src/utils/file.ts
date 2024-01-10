import fs from 'fs'
import { Request } from 'express'
import { File } from 'formidable'
import { UPLOAD_TEMP_DIR } from '~/constants/dir'
import path from 'path'

export const initFolderUploads = () => {
  if (!fs.existsSync(UPLOAD_TEMP_DIR)) {
    // recursive: true
    // tự tạo folder nếu folder cha chưa có..
    fs.mkdirSync(UPLOAD_TEMP_DIR, { recursive: true })
  }
}

export const handleUploadImage = async (req: Request) => {
  // import CommonJS supported library using ESModule.
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_TEMP_DIR,
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    maxTotalFileSize: 300 * 1024 * 4,
    maxFiles: 4,
    filter: function ({ name, originalFilename, mimetype }) {
      // name là key
      // originalFilename là tên file ban đầu
      // mimetype là định dạng
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as never, new Error('File type is not supported') as never)
      }
      // trả về giá trị boolean
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        // throw trong 1 async callback trong ExpressJS
        // sẽ bị crashed, và chỉ làm cái function bé này lỗi
        return reject(err)
      }
      // kiểm tra key image có tồn tại hay không
      if (!files.image) {
        return reject(new Error('File is empty'))
      }
      // lấy về key image
      resolve(files.image as File[])
    })
  })
}

export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}

export const getExtensionFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.shift()
  return namearr.join('')
}
