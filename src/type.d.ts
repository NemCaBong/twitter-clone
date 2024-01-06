// This file extends the 'express' module by adding a new property to the 'Request' interface.
// The 'user' property is of type 'User' and represents the authenticated user making the request.
// This allows us to access the user object in the request handlers.
import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import User from '~/models/schemas/User.schema'
import { TokenPayload } from './models/requests/User.requests'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
