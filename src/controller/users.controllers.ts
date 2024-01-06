import { Request, Response } from 'express'
import usersService from '~/services/user.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { LogoutReqBody, RegisterReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { USERS_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

/**
 * Lo phần đăng ký user.
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
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result: result
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.json(result)
}
