import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
// can be reused by many routes

// provides a reusable middleware function that can be used to validate incoming requests based on a set of predefined validation rules
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
