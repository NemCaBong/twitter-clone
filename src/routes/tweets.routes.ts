import { get } from 'axios'
import { Router } from 'express'
import { createTweetController, getTweetChildrenController, getTweetController } from '~/controller/tweets.controller'
import {
  audienceValidator,
  getTweetChildrenValidator,
  tweetIdValidator,
  tweetValidator
} from '~/middlewares/tweets.middlewares'
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
 * Path: /:tweet_id
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 */
tweetsRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

/**
 * Description. GET children tweet
 * Path: /:tweet_id/children
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 * Body: { limit: number, page: number, tweet_type: TweetType }
 */
tweetsRouter.get(
  '/:tweet_id/children',
  tweetIdValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

export default tweetsRouter
