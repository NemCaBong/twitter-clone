import { Request, Response } from 'express'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'

export const uploadImageController = async (req: Request, res: Response) => {
  // bắt được error reject.
  const url = await mediasService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveImageController = (req: Request, res: Response) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    // chủ động response bắt lỗi ở đây.
    if (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.status((err as any).status).send('Not found')
    }
  })
}

export const serveVideoController = (req: Request, res: Response) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name), (err) => {
    // chủ động response bắt lỗi ở đây.
    if (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      res.status((err as any).status).end('Not found')
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response) => {
  // bắt được error reject.
  const url = await mediasService.uploadVideo(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}
