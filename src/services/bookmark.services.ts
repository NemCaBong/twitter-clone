import Bookmark from '~/models/schemas/Bookmark.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class BookmarkService {
  async bookmarkTweet(tweet_id: string, user_id: string) {
    const result = await databaseService.bookmarks.findOneAndUpdate(
      { user_id: new ObjectId(user_id), tweet_id: new ObjectId(tweet_id) },
      { $setOnInsert: new Bookmark({ tweet_id: new ObjectId(tweet_id), user_id: new ObjectId(user_id) }) },
      { upsert: true, returnDocument: 'after' }
    )
    return result
  }
}

const bookmarkService = new BookmarkService()
export default bookmarkService
