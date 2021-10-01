import { Account } from './Account'
import { HasCreateTimestamp } from './HasTimestamps'
import { Model } from './Mode'

/**
 * PostLike interface.
 */
export interface PostLike extends Model, HasCreateTimestamp {
  postId: number
  topicId: number
  comment: string
  account: Account
}
