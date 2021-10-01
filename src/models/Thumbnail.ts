/**
 * ThumbnailType type.
 */
export type ThumbnailType = 'small' | 'medium' | 'large'

/**
 * Thumbnail interface.
 */
export interface Thumbnail {
  type: ThumbnailType
  fileSize: number
  width: number
  height: number
}
