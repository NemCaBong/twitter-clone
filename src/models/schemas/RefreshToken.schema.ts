import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  _id?: ObjectId
  user_id: ObjectId
  created_at?: Date
  token: string
}

export default class RefreshToken {
  _id?: ObjectId
  user_id: ObjectId
  created_at: Date
  token: string
  constructor({ _id, token, created_at, user_id }: RefreshTokenType) {
    this._id = _id
    this.user_id = user_id
    this.created_at = created_at || new Date()
    this.token = token
  }
}
