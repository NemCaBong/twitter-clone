// This file extends the 'express' module by adding a new property to the 'Request' interface.
// The 'user' property is of type 'User' and represents the authenticated user making the request.
// This allows us to access the user object in the request handlers.
import { Request } from 'express'
import User from '~/models/schemas/User.schema'

declare module 'express' {
  interface Request {
    user?: User
  }
}
