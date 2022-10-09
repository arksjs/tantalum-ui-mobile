export type AvatarShape = 'default' | 'circle'

export type ButtonShape = 'default' | 'round'

export interface SkeletonCommonProps {
  animated?: boolean
}

export interface SkeletonProps extends SkeletonCommonProps {
  avatarShape?: AvatarShape
  buttonShape?: ButtonShape
  // 设置段落占位图的行数
  paragraphRow?: number
  loading?: boolean
  avatar?: boolean
}

export interface SkeletonAvatarProps extends SkeletonCommonProps {
  shape?: AvatarShape
}

export interface SkeletonButtonProps extends SkeletonCommonProps {
  shape?: ButtonShape
}

export type SkeletonImageProps = SkeletonCommonProps

export interface SkeletonParagraphProps extends SkeletonCommonProps {
  // 设置段落占位图的行数
  row?: number
}

export type SkeletonTitleProps = SkeletonCommonProps

export type {
  AvatarShape as SkeletonAvatarShape,
  ButtonShape as SkeletonButtonShape
}
