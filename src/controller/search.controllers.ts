import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SearchQuery } from '~/models/requests/Search.request'
import searchService from '~/services/search.services'

export const searchController = async (
  req: Request<ParamsDictionary, unknown, unknown, SearchQuery>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const user_id = req.decoded_authorization?.user_id as string
  const result = await searchService.search({ limit, page, content: req.query.content, user_id })
  return res.json({
    message: 'Search success',
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}
