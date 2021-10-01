/**
 * HasCreateTimestamp interface.
 */
export interface HasCreateTimestamp {
  createdAt: string
}

/**
 * HasUpdateTimestamp interface.
 */
export interface HasUpdateTimestamp {
  updatedAt: string
}

/**
 * HasTimestamps interface.
 */
export interface HasTimestamps extends HasCreateTimestamp, HasUpdateTimestamp {}
