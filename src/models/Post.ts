import { Account } from './Account'
import { HasTimestamps } from './HasTimestamps'
import { Mention } from './Mention'
import { Model } from './Mode'

/**
 * Post interface.
 */
export interface Post extends Model, HasTimestamps {
  topicId: number
  replyTo: number
  message: string
  account: Account
  mention: Mention
  attachments: []
  likes: Account
}
