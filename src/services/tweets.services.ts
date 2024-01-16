import { TweetReqBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId, WithId } from 'mongodb'
import Hashtag from '~/models/schemas/Hashtag.schema'

class TweetsServices {
  async checkAndCreateHashtags(hashtags: string[]) {
    const hashtagDocuments = await Promise.all(
      hashtags.map((hashtag) => {
        // Tìm hashtag trong database
        // có thì lấy ko thì tạo mới
        return databaseService.hashtags.findOneAndUpdate(
          { name: hashtag },
          { $setOnInsert: new Hashtag({ name: hashtag }) },
          { upsert: true, returnDocument: 'after' }
        )
      })
    )
    return hashtagDocuments.map((hashtag) => hashtag?._id) as ObjectId[]
  }

  async createTweet(user_id: string, tweet: TweetReqBody) {
    const hashtags = await this.checkAndCreateHashtags(tweet.hashtags)
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: tweet.audience,
        content: tweet.content,
        mentions: tweet.mentions,
        medias: tweet.medias,
        parent_id: tweet.parent_id,
        hashtags,
        type: tweet.type,
        user_id: new ObjectId(user_id)
      })
    )
    return result
  }

  async increaseView(tweet_id: string, user_id: string | undefined) {
    const inc = user_id ? { user_views: 1 } : { guest_view: 1 }

    const result = await databaseService.tweets.findOneAndUpdate(
      {
        _id: new ObjectId(tweet_id)
      },
      {
        $inc: inc,
        $currentDate: { updated_at: true }
      },
      {
        returnDocument: 'after',
        projection: { user_views: 1, guest_views: 1 }
      }
    )
    return result as WithId<{ guest_views: number; user_views: number }>
  }
}

const tweetsService = new TweetsServices()
export default tweetsService
