/**
 * Thư mục chứa các middlewares có thể reuse
 * Ở nhiều nơi khác nhau trong project
 */

import { Request, Response, NextFunction } from 'express'
import { pick } from 'lodash'

/**
 * Tạo ra type generic FilterKeys
 * để gợi ý các field có thể filter
 * trong lúc nhập và kiểm tra lỗi
 *   */
type FilterKeys<T> = Array<keyof T>

export const filterMiddleware =
  <T>(filterKey: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKey)
    next()
  }
