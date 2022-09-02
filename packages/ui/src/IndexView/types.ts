import type { StickyViewItemProps } from '../StickyView/types'

export type OnChange = (index: number, fromIndex: number) => void

export interface IndexViewProps {
  stickyOffsetTop?: number | string
}

export interface IndexViewEmits {
  onChange?: OnChange
}

export type IndexViewItemProps = StickyViewItemProps

export interface IndexViewRef {
  switchToIndex?: (index: number) => void
}
