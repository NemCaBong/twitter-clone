import { Router } from 'express'
import { searchController } from '~/controller/search.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const searchRouter = Router()
/**
 * Description. Like a Tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { tweet_id: string }
 */
searchRouter.get('/', wrapRequestHandler(searchController))

export default searchRouter
