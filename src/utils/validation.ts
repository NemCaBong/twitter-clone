import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

/**
 * provides a reusable middleware function that can be used to validate incoming requests based on a set of predefined validation rules
 *
 */
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // run xong hết các validation
    await validation.run(req)
    // nhận về các errors của từng fields
    const errors = validationResult(req)

    // nếu ko có lỗi thì next
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped()
    const entityErrors = new EntityError({ errors: {} })
    for (const key in errorsObject) {
      const { msg } = errorsObject[key]
      // lỗi không phải do validation
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityErrors.errors[key] = errorsObject[key]
    }
    // lỗi do validation
    next(entityErrors)
  }
}
