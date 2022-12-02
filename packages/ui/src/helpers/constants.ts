export const PLACEMENT_TYPES = ['bottom', 'top', 'left', 'right'] as const
export type PlacementType = typeof PLACEMENT_TYPES[number]

export const STATE_TYPES = [
  'default',
  'primary',
  'warning',
  'danger',
  'success'
] as const
export type StateType = typeof STATE_TYPES[number]

export const SIZE_TYPES = ['large', 'middle', 'small'] as const
export type SizeType = typeof SIZE_TYPES[number]
