import { Router } from 'express'
import {
  uploadHLSVideoController,
  uploadImageController,
  uploadVideoController,
  videoStatusController
} from '~/controller/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const mediaRoutes = Router()

mediaRoutes.post('/upload-image', wrapRequestHandler(uploadImageController))

mediaRoutes.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)

mediaRoutes.post(
  '/upload-video-hls',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadHLSVideoController)
)

mediaRoutes.get(
  '/video-status/:id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(videoStatusController)
)

export default mediaRoutes
