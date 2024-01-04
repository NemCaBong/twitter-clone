import jwt, { SignOptions } from 'jsonwebtoken'
import { resolve } from 'path'

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
