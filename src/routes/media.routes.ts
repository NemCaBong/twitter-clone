import { Router } from 'express'
import { uploadImageController } from '~/controller/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const mediaRoutes = Router()

mediaRoutes.post('/upload-image', wrapRequestHandler(uploadImageController))

export default mediaRoutes
