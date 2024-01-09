import { Router } from 'express'
import { serveImageController } from '~/controller/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)

export default staticRouter
