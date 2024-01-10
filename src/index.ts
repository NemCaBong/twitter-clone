import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRoutes from './routes/media.routes'
import { initFolderUploads } from './utils/file'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
config()
// connect db
databaseService.connect()
initFolderUploads()

const app = express()
app.use(express.json())
// routes
app.use('/users', usersRouter)
app.use('/medias', mediaRoutes)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(defaultErrorHandler)

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
