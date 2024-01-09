import fs from 'fs'
import path from 'path'
import { Request } from 'express'

export const initFolderUploads = () => {
  if (!fs.existsSync(path.resolve('uploads'))) {
    // recursive: true
    // tự tạo folder nếu folder cha chưa có..
    fs.mkdirSync(path.resolve('uploads'), { recursive: true })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  // import CommonJS supported library using ESModule.
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    maxFiles: 1,
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
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        // throw trong 1 async callback trong ExpressJS
        // sẽ bị crashed, và chỉ làm cái function bé này lỗi
        reject(err)
      }

      // kiểm tra key image có tồn tại hay không
      if (!files.image) {
        reject(new Error('File is empty'))
      }
      resolve(files)
    })
  })
}