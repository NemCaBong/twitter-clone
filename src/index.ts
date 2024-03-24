import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediaRoutes from './routes/media.routes'
import { initFolderUploads } from './utils/file'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import cors from 'cors'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import './utils/s3'
import { createServer } from 'http'
import { Server } from 'socket.io'
import Conversation from './models/schemas/Conversation.schema'

// import '~/utils/fake'
config()
// connect db
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

initFolderUploads()

const app = express()
const httpServer = createServer(app)
app.use(cors())
app.use(express.json())
// routes
app.use('/users', usersRouter)
app.use('/medias', mediaRoutes)
app.use('/static', staticRouter)
app.use('/tweets', tweetsRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

const users: {
  [key: string]: {
    socket_id: string
  }
} = {}

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }
  socket.on('private message', async (data) => {
    const receiver_socket_id = users[data.to]?.socket_id
    if (!receiver_socket_id) return

    await databaseService.conversations.insertOne(
      new Conversation({
        sender_id: data.from,
        receiver_id: data.to,
        content: data.content
      })
    )

    socket.to(receiver_socket_id).emit('receive private message', {
      from: user_id,
      content: data.content
    })
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
  })
})

const port = process.env.PORT || 4000
httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
