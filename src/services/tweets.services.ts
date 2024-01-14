import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'

class TweetsServices {
  async createTweet(user_id: string, tweet: TweetRequestBody) {
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: tweet.audience,
        content: tweet.content,
        mentions: tweet.mentions,
        medias: tweet.medias,
        parent_id: tweet.parent_id,
        hashtags: [], // chưa làm chỗ hashtags
        type: tweet.type,
        user_id: new ObjectId(user_id)
      })
    )
    return result
  }
}

const tweetsService = new TweetsServices()
export default tweetsService
