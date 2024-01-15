import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controller/bookmarks.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const bookmarksRouter = Router()
/**
 * Description. Bookmark a Tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { tweet_id: string }
 */
bookmarksRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(bookmarkTweetController))

/**
 * Description. Unbookmark a Tweet
 * Path: /:tweet_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unbookmarkTweetController)
)

export default bookmarksRouter
