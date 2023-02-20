import type { Noop } from '../helpers'

export type OnActiveIndexChange = (index: number, fromIndex: number) => void

export type OnAnimated = OnActiveIndexChange

export type OnResetItems = (
  items: {
    name: string
    subName: string
    index: number
  }[]
) => void

export interface SwiperProps {
  indicatorDots?: boolean // 是否显示面板指示点
  indicatorColor?: string
  indicatorActiveColor?: string
  navigationButtons?: boolean
  autoplay?: boolean
  interval?: number | string
  duration?: number | string
  initialCircular?: boolean
  initialVertical?: boolean
  bounces?: boolean // 边界弹性控制
  activeIndex?: number | string
}

export interface SwiperEmits {
  onUpdateActiveIndex?: (index: number) => void
  onActiveIndexChange?: OnActiveIndexChange
  onAnimated?: OnAnimated
  onClick?: Noop
}

export type SwiperItemProps = {
  className?: string
  index?: number
  vertical?: boolean
}

export interface SwiperRef {
  swipeTo: (newIndex: number) => void
  prev: Noop
  next: Noop
}

export type {
  OnActiveIndexChange as SwiperOnActiveIndexChange,
  OnAnimated as SwiperOnAnimated
}
