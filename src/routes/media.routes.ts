import { Router } from 'express'
import { uploadSingleImageController } from '~/controller/media.controllers'
const mediaRoutes = Router()

mediaRoutes.post('/upload-image', uploadSingleImageController)

export default mediaRoutes
