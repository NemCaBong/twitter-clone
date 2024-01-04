import express, { NextFunction, Request, Response } from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'

const app = express()
const port = 3000

app.use(express.json())
app.use('/users', usersRouter)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(400).json({
    error: err.message
  })
})

// connect db
databaseService.connect()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
