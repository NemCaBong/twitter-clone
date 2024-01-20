import { MediaTypeQuery } from '~/constants/enums'
import { Pagination } from './Tweet.requests'
import { Query } from 'express-serve-static-core'

// query của search có ndung và có phân trang
export interface SearchQuery extends Pagination, Query {
  content: string
  media_type: MediaTypeQuery
  people_follow: string
}
