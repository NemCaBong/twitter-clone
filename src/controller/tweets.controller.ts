import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { stringify } from 'querystring'
import { TweetType } from '~/constants/enums'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { Pagination, TweetParam, TweetQuery, TweetReqBody } from '~/models/requests/Tweet.requests'
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
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  // phải cập nhật lại views ở trạng thái mới nhất
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views,
    updated_at: result.updated_at
  }
  return res.json({
    message: 'Get tweet successfully',
    result: tweet
  })
}

export const getTweetChildrenController = async (
  req: Request<TweetParam, unknown, unknown, TweetQuery>,
  res: Response
) => {
  const page = Number(req.query.page as string)
  const limit = Number(req.query.limit as string)
  const tweet_type = Number(req.query.tweet_type as string) as TweetType
  const user_id = req.decoded_authorization?.user_id

  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })

  return res.json({
    message: 'Get tweet children successfully',
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit) // tổng số trang để phân
    }
  })
}

export const getNewFeedsController = async (
  req: Request<ParamsDictionary, unknown, unknown, Pagination>,
  res: Response
) => {
  const user_id = req.decoded_authorization?.user_id as string
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const result = await tweetsService.getNewFeeds({ user_id, limit, page })
  return res.json({
    message: TWEETS_MESSAGES.GET_NEW_FEEDS_SUCCESSFULLY,
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}
