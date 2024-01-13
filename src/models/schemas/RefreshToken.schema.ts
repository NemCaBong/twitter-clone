import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  user_id: ObjectId
  created_at?: Date
  token: string
  iat: number
  exp: number
}

export default class RefreshToken {
  _id?: ObjectId
  user_id: ObjectId
  created_at: Date
  token: string
  iat: Date
  exp: Date
  constructor({ _id, token, created_at, user_id, iat, exp }: RefreshTokenType) {
    this._id = _id
    this.user_id = user_id
    this.created_at = created_at || new Date()
    this.token = token
    this.iat = new Date(iat * 1000)
    this.exp = new Date(exp * 1000) // Convert Epoch time to Date
  }
}
