import type { OnClick } from '../helpers'

export interface BackTopProps {
  visibleHeight?: number | string
  animated?: boolean
  offset?: number | number[]
  enableSafeAreaInsets?: boolean
}

export interface BackTopEmits {
  onClick?: OnClick
}
