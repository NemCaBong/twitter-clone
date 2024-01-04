import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

/**
 * Handles errors that occur during request processing.
 * Tất cả các lỗi trong app đều sẽ được xử lý ở đây
 *
 * @param err - The error that occurred.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // omit loại bỏ thuộc tính trong obj => omit lodash
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
