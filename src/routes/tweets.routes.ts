import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controller/tweets.controller'
import { tweetIdValidator, tweetValidator } from '~/middlewares/tweets.middlewares'
import {
  accessTokenValidator,
  isUserLoggedInValidator,
  loginValidator,
  verifiedUserValidator
} from '~/middlewares/users.middlewares'
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

/**
 * Description. GET tweet by id
 * Path: /
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 */
tweetsRouter.post(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  wrapRequestHandler(getTweetController)
)

export default tweetsRouter
