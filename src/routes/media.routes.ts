import { Router } from 'express'
import { uploadSingleImageController } from '~/controller/media.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const mediaRoutes = Router()

mediaRoutes.post('/upload-image', wrapRequestHandler(uploadSingleImageController))

export default mediaRoutes
