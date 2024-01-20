import { Router } from 'express'
import { searchController } from '~/controller/search.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const searchRouter = Router()
/**
 * Description. Like a Tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { tweet_id: string }
 */
searchRouter.get('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(searchController))

export default searchRouter
