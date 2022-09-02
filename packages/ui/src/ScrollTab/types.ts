import type { StickyViewItemProps } from '../StickyView/types'

export type OnChange = (index: number, fromIndex: number) => void

export interface ScrollTabProps {
  stickyOffsetTop?: number | string
  stickyOffsetBottom?: number | string
}

export interface ScrollTabEmits {
  onChange?: OnChange
}

export type ScrollTabItemProps = StickyViewItemProps

export interface ScrollTabRef {
  switchToIndex?: (index: number) => void
}
