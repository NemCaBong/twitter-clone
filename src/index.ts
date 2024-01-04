import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
// connect db
databaseService.connect()

const app = express()
app.use(express.json())
// routes
app.use('/users', usersRouter)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(defaultErrorHandler)

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
