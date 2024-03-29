import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

/**
 * Tất cả các lỗi trong controller và validation đều sẽ được xử lý ở đây
 *
 * @param err - The error that occurred.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    // cả EntityError và ErrorWithStatus đều bắt vào đây
    if (err instanceof ErrorWithStatus) {
      return res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
    }
    const finalErr: any = {}
    // vì nếu throw new Error của JS => Sẽ có stack trace
    // nên chúng ta phải chuyển enumerable của Error thành true
    // rồi omit ['stack'] để ko trả về stack trace
    Object.getOwnPropertyNames(err).forEach((key) => {
      if (!Object.getOwnPropertyDescriptor(err, key)?.enumerable || !Object.getOwnPropertyDescriptor(err, key)) {
        return
      }
      finalErr[key] = err[key]
      // Object.defineProperty(err, key, { enumerable: true })
    })
    // mặc định là lỗi server nếu là Error của JS
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      error_info: omit(err, ['stack'])
    })
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal Server Error', errorInfo: omit(error as any, ['stack']) })
  }
}
