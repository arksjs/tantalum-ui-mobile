import type { SwiperOnAnimated } from '../Swiper/types'

type OnChange = (name: string, index: number) => void

export interface TabViewProps {
  modelValue?: string
  initialVertical?: boolean
  scrollThreshold?: number
}

export interface TabViewEmits {
  onChange?: OnChange
  onAnimated?: SwiperOnAnimated
}

export interface TabViewItemProps {
  name: string
  title?: string
  subTitle?: string
}

export interface TabViewRef {
  switchTo: (name: string) => void
  switchToIndex: (index: number) => void
}

export type {
  OnChange as TabViewOnChange,
  SwiperOnAnimated as TabViewOnAnimated
}
