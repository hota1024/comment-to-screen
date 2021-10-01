import { HasTimestamps } from './HasTimestamps'
import { Model } from './Mode'

/**
 * Account interface.
 */
export interface Account extends Model, HasTimestamps {
  name: string
  fullName: string
  suggestion: string
  imageUrl: string
}
