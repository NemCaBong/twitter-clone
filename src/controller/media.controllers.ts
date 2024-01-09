import { Request, Response, NextFunction } from 'express'
import path from 'path'
export const uploadSingleImageController = async (req: Request, res: Response) => {
  // import CommonJS supported library using ESModule.
  //
  const formidable = (await import('formidable')).default
  console.log(path.resolve())
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    keepExtensions: true,
    maxFileSize: 300 * 1024, // 300KB
    maxFiles: 1
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    return res.json({ message: 'Upload successfully' })
  })
}
