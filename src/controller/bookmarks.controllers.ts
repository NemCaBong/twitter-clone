import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { BOOKMARKS_MESSAGES } from '~/constants/messages'
import { BookmarkTweetReqBody } from '~/models/requests/Bookmark.request'
import { TokenPayload } from '~/models/requests/User.requests'
import bookmarkService from '~/services/bookmark.services'

export const bookmarkTweetController = async (
  req: Request<ParamsDictionary, unknown, BookmarkTweetReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const result = await bookmarkService.bookmarkTweet(tweet_id, user_id)
  return res.json({ message: BOOKMARKS_MESSAGES.BOOKMARK_TWEET_SUCCESS, result })
}

export const unbookmarkTweetController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await bookmarkService.unbookmarkTweet(req.params.tweet_id, user_id)
  return res.json({ message: BOOKMARKS_MESSAGES.UNBOOKMARK_TWEET_SUCCESS })
}
