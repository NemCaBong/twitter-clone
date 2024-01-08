import { config } from 'dotenv'
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/User.requests'
config()

export const signToken = ({
  payload,
  privateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey: string
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

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {Object} options - The options for verifying the token.
 * @param {string} options.token - The JWT token to verify.
 * @param {string} [options.secretOrPublicKey] - The secret or public key to use for verification. If not provided, it uses the value from the environment variable JWT_SECRET.
 * @returns {Promise<TokenPayload>} - A promise that resolves with the decoded payload of the token.
 * @throws {Error} - If there is an error while verifying the token.
 */
export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      if (err) throw reject(err)

      resolve(decoded as TokenPayload)
    })
  })
}
