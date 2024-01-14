import { Router } from 'express'
import { createTweetController } from '~/controller/tweets.controller'
import { tweetValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, loginValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const tweetsRouter = Router()

/**
 * Description. Create a new tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetValidator,
  wrapRequestHandler(createTweetController)
)

export default tweetsRouter