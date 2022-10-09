import type { SwiperOnChange, SwiperOnAnimated } from '../Swiper/types'

export interface TabViewProps {
  initialVertical?: boolean
  scrollThreshold?: number
}

export interface TabViewEmits {
  onChange?: SwiperOnChange
  onAnimated?: SwiperOnAnimated
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

export type {
  SwiperOnChange as TabViewOnChange,
  SwiperOnAnimated as TabViewOnAnimated
}
