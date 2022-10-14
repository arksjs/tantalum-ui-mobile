import type {
  StickyViewItemProps,
  StickyViewOnChange
} from '../StickyView/types'

export interface IndexViewProps {
  stickyOffsetTop?: number | string
}

export interface IndexViewEmits {
  onChange?: StickyViewOnChange
}

export type IndexViewItemProps = StickyViewItemProps

export interface IndexViewRef {
  switchToIndex?: (index: number) => void
}

export type { StickyViewOnChange as IndexViewOnChange }
