import { config } from 'dotenv'
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { reject } from 'lodash'
import { resolve } from 'path'
config()
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) throw reject(err)
      // chắc chắn token phải là string thì mới resolve về
      // thế nên có thể as string ở đây
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) throw reject(err)

      resolve(decoded as JwtPayload)
    })
  })
}
