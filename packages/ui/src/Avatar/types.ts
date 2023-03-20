import type { SizeType } from '../helpers'
import type { BadgeOption } from '../Badge/types'

export type ShapeType = 'circle' | 'square'

export type AvatarSize = number | SizeType

export type Gender = 'man' | 'woman'

interface AvatarCommonProps {
  size?: AvatarSize
}

export interface AvatarProps extends AvatarCommonProps {
  shape?: ShapeType
  src?: string
  badge?: BadgeOption
  gender?: Gender
  color?: string
}

export interface AvatarGroupProps extends AvatarCommonProps {
  totalCount?: number | string
  countColor?: string
}

export type { ShapeType as AvatarShape }
