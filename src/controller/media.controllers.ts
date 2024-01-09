import { Request, Response, NextFunction } from 'express'
import { handleUploadSingleImage } from '~/utils/file'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  // bắt được error reject.
  const data = await handleUploadSingleImage(req)
  return res.json({
    message: 'Upload Successfully'
  })
}
