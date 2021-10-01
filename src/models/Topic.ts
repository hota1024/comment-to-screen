import { Model } from './Mode'
import { HasTimestamps } from './HasTimestamps'

/**
 * Topic interface.
 */
export interface Topic extends Model, HasTimestamps {
  name: string
  suggestion: string
  lastPostedAt: string
}
