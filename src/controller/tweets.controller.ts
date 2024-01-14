import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'

export const createTweetController = async (
  req: Request<ParamsDictionary, unknown, TweetRequestBody>,
  res: Response
) => {
  return res.send('Create Tweet Controller')
}
