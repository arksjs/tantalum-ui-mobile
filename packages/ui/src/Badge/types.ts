export type BadgeProps = Partial<{
  color: string
  content: string | number
  offset: number[]
  animated: boolean
  dot: boolean
  maxCount: number | string
  showZero: boolean
}>

export type BadgeOption = number | string | BadgeProps
