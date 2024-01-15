import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId, WithId } from 'mongodb'
import { has } from 'lodash'
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

  async createTweet(user_id: string, tweet: TweetRequestBody) {
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
}

const tweetsService = new TweetsServices()
export default tweetsService
