import { JwtPayload } from 'jsonwebtoken'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenType, UserVerifyStatus } from '~/constants/enums'

export interface LoginReqBody {
  email: string
  password: string
}

export interface RegisterReqBody {
  email: string
  password: string
  name: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}

export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}
export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}

export interface FollowReqBody {
  followed_user_id: string
}

export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}
