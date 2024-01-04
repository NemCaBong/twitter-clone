import { Request, Response } from 'express'
import usersService from '~/services/user.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'duthanhduoc@gmail.com' && password === '123456') {
    return res.status(200).json({
      message: 'Login success'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

/**
 * Handles the registration of a user.
 *
 * @param req - The request object containing the user registration data.
 * @param res - The response object used to send the registration result.
 * @returns A JSON response indicating the success of the registration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  // ko cần try catch bởi đã wrap trong wrapRequestHandler
  const result = await usersService.register(req.body)
  return res.status(200).json({
    message: 'Register success',
    result: result
  })
}
