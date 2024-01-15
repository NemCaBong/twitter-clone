import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetReqBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, unknown, TweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)

  return res.json({
    message: 'Create tweet successfully',
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  return res.json({
    message: 'Create tweet successfully',
    result: 'Ok'
  })
}
