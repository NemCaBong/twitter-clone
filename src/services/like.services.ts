import Like from '~/models/schemas/Bookmark.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class LikeService {
  async likeTweet(tweet_id: string, user_id: string) {
    const result = await databaseService.likes.findOneAndUpdate(
      { user_id: new ObjectId(user_id), tweet_id: new ObjectId(tweet_id) },
      { $setOnInsert: new Like({ tweet_id: new ObjectId(tweet_id), user_id: new ObjectId(user_id) }) },
      { upsert: true, returnDocument: 'after' }
    )
    return result
  }

  async unlikeTweet(tweet_id: string, user_id: string) {
    const result = await databaseService.likes.findOneAndDelete({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return result
  }
}

const likeService = new LikeService()
export default likeService
