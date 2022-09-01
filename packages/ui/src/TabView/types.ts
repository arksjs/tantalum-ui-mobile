import { OnChange, OnAnimated } from '../Swiper/types'

export interface TabViewProps {
  initialVertical?: boolean
  scrollThreshold?: number
}

export interface TabViewEmits {
  onChange?: OnChange
  onAnimated?: OnAnimated
}

export interface TabViewItemProps {
  name?: string
  subName?: string
  vertical?: boolean
  index?: number
}

export interface TabViewRef {
  switchToIndex?: (index: number) => void
}
