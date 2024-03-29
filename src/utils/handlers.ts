import { NextFunction, Request, RequestHandler, Response } from 'express'
/**
 * Wraps an request handler function with error handling.
 *
 * @param fn - The request handler function to be wrapped.
 * @returns A new request handler function that handles errors.
 */
export const wrapRequestHandler = <P>(func: RequestHandler<P, any, any, any>) => {
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
