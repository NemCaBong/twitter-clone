import { Pagination } from './Tweet.requests'

// query của search có ndung và có phân trang
export interface SearchQuery extends Pagination {
  content: string
}
