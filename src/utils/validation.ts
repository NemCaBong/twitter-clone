import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // run xong hết các validation
    await validation.run(req)
    // nhận về các errors của từng fields
    const errors = validationResult(req)
    // Nếu mà không có lỗi thì next
    if (errors.isEmpty()) {
      return next()
    }
    // mapped() sẽ gom lỗi theo fields trong checkSchema({})
    res.status(400).json({ errors: errors.mapped() })
  }
}
