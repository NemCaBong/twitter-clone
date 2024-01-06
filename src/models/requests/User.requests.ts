import { JwtPayload } from 'jsonwebtoken'
import { extend } from 'lodash'
import { TokenType } from '~/constants/enums'

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

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}
