import fs from 'fs'
import path from 'path'

export const initFolderUploads = () => {
  if (!fs.existsSync(path.resolve('uploads'))) {
    // recursive: true
    // tự tạo folder nếu folder cha chưa có..
    fs.mkdirSync(path.resolve('uploads'), { recursive: true })
  }
}
