import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controller/medias.controllers'
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

export default mediaRoutes
