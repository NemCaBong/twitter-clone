import { Request, Response, NextFunction } from 'express'
import mediasService from '~/services/medias.services'
import { handleUploadSingleImage } from '~/utils/file'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  // bắt được error reject.
  const result = await mediasService.handleUploadSingleImage(req)
  return res.json({
    result
  })
}
