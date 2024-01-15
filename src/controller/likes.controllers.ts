import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LIKES_MESSAGES } from '~/constants/messages'
import { LikeTweetReqBody } from '~/models/requests/Like.request'
import { TokenPayload } from '~/models/requests/User.requests'
import likeService from '~/services/like.services'

export const likeTweetController = async (req: Request<ParamsDictionary, unknown, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await likeService.likeTweet(tweet_id, user_id)
  return res.json({ message: LIKES_MESSAGES.LIKE_TWEET_SUCCESS, result })
}

export const unlikeTweetController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await likeService.unlikeTweet(req.params.tweet_id, user_id)
  return res.json({ message: LIKES_MESSAGES.UNLIKE_TWEET_SUCCESS })
}
