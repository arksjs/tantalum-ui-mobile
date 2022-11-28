import type { PlacementType } from '../helpers'

export interface FixedProps {
  fixed?: boolean
  placement?: PlacementType
  enableSafeAreaInsets?: boolean
  background?: string
  zIndex?: number
  spaceHold?: boolean
}
