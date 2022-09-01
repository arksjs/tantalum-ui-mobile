import type { BadgeOption } from '../Badge/types'

export type ShapeType = 'circle' | 'square'

export type SizeType = 'middle' | 'large' | 'small'

export type UserSizeType = number | 'middle' | 'large' | 'small'

export type Gender = 'man' | 'woman'

interface AvatarCommonProps {
  size?: UserSizeType
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
