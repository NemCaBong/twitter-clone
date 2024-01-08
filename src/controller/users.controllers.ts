import { Request, Response } from 'express'
import usersService from '~/services/user.services'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  ChangePasswordReqBody,
  FollowReqBody,
  ForgotPasswordReqBody,
  GetProfileReqParams,
  LoginReqBody,
  LogouttReqBody,
  RefreshTokenReqBody,
  RegisterReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  UnfollowReqParams,
  UpdateMeReqBody,
  VerifyEmailReqBody
} from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import { USERS_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import { UserVerifyStatus } from '~/constants/enums'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'

export const loginController = async (req: Request<ParamsDictionary, unknown, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login({ user_id: user_id.toString(), verify: user.verify })
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
export const registerController = async (req: Request<ParamsDictionary, unknown, RegisterReqBody>, res: Response) => {
  // ko cần try catch bởi đã wrap trong wrapRequestHandler
  const result = await usersService.register(req.body)
  return res.status(200).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result: result
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutController = async (req: Request<ParamsDictionary, unknown, LogouttReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  res.json(result)
}

export const refreshTokenController = async (
  req: Request<ParamsDictionary, unknown, RefreshTokenReqBody>,
  res: Response
) => {
  const { refresh_token } = req.body
  const { user_id, verify } = req.decoded_refresh_token as TokenPayload
  const result = await usersService.refreshToken({ user_id, refresh_token, verify })
  return res.json({
    message: USERS_MESSAGES.REFRESH_TOKEN_SUCCESS,
    result
  })
}

export const verifyEmailTokenController = async (
  req: Request<ParamsDictionary, unknown, VerifyEmailReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })

  // nếu ko tìm thấy user
  if (!user) {
    return res.status(404).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }

  // đã verify rồi => Không báo lỗi
  // Trả về status OK với message thông báo
  // đã verify trước đó rồi.
  if (user.email_verify_token === '') {
    return res.status(200).json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  // Nếu chưa verified
  const result = await usersService.verifyEmail(user_id)
  return res.status(200).json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS,
    result
  })
}

export const resendVerifyEmailController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await databaseService.users.findOne({ _id: new ObjectId(user_id) })
  // ko có user
  if (!user) {
    return res.status(404).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  // user đã verified rồi
  if (user.verify === UserVerifyStatus.Verified) {
    return res.status(200).json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  // resend email
  const result = await usersService.resendVerifyEmail(user_id)
  return res.status(200).json(result)
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, unknown, ForgotPasswordReqBody>,
  res: Response
) => {
  const { _id, verify } = req.user as User
  const result = await usersService.forgotPassword({ user_id: (_id as ObjectId).toString(), verify: verify })
  return res.json(result)
}

export const verifyForgotPasswordController = async (req: Request, res: Response) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS
  })
}

export const resetPasswordController = async (
  req: Request<ParamsDictionary, unknown, ResetPasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_forgot_password_token as TokenPayload
  const { password } = req.body
  const result = await usersService.resetPassword(user_id, password)
  return res.json(result)
}

export const getMeController = async (req: Request, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const user = await usersService.getMe(user_id)
  if (!user) {
    return res.status(404).json({
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  return res.json({
    message: USERS_MESSAGES.GET_ME_SUCCESS,
    result: user
  })
}

export const updateMeController = async (req: Request<ParamsDictionary, unknown, UpdateMeReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { body } = req
  const result = await usersService.updateMe(user_id, body)
  return res.json({ message: USERS_MESSAGES.UPDATE_ME_SUCCESS, result })
}

export const getProfileController = async (req: Request<GetProfileReqParams>, res: Response) => {
  // Đè user: string vào P = ParamsDictionary
  const { username } = req.params
  const user = await usersService.getProfile(username)

  if (!user) {
    throw new ErrorWithStatus({
      message: USERS_MESSAGES.USER_NOT_FOUND,
      status: HTTP_STATUS.NOT_FOUND
    })
  }

  return res.json({
    message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
    result: user
  })
}

export const followController = async (req: Request<ParamsDictionary, unknown, FollowReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { followed_user_id } = req.body
  const result = await usersService.follow(user_id, followed_user_id)

  return res.json(result)
}

export const unfollowController = async (req: Request<UnfollowReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { user_id: unfollowed_user_id } = req.params
  const result = await usersService.unfollow(user_id, unfollowed_user_id)
  return res.json(result)
  // return res.json(result)
}

export const changePasswordController = async (
  req: Request<ParamsDictionary, unknown, ChangePasswordReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { password } = req.body
  const result = await usersService.changePassword(user_id, password)
  res.json(result)
}
