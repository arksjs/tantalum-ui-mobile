import type { PlacementType } from '../helpers/types'

export interface FixedProps {
  fixed?: boolean
  placement?: PlacementType
  enableSafeAreaInsets?: boolean
  background?: string
  zIndex?: number
  spaceHold?: boolean
}
