import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import User from '~/models/schemas/User.schema'
import { config } from 'dotenv'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follow.schema'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
config()

// Replace the placeholder with your Atlas connection string
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter-nodejs.hatonpi.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error ', error)
      throw error
      // Ensures that the client will close when you finish/error
      // await this.client.close()
    }
  }

  // Index cho collection users
  indexUsers() {
    // compound index
    this.users.createIndex({ email: 1, password: 1 })
    this.users.createIndex({ email: 1 }, { unique: true })
    this.users.createIndex({ username: 1 }, { unique: true })
  }

  indexRefreshTokens() {
    this.refreshTokens.createIndex({ token: 1 })
    this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
  }

  indexVideoStatus() {
    this.videoStatus.createIndex({ name: 1 })
  }

  indexFollowers() {
    this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string)
  }

  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(process.env.DB_VIDEO_STATUS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
