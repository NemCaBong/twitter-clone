import { NextFunction, Request, RequestHandler, Response } from 'express'
/**
 * Wraps an request handler function with error handling.
 *
 * @param fn - The request handler function to be wrapped.
 * @returns A new request handler function that handles errors.
 */
export const wrapRequestHandler = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
