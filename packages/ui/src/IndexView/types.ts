import type { StickyViewItemProps, StickyViewOnChange } from '../StickyView/types'

export interface IndexViewProps {
  modelValue?: string
  stickyOffsetTop?: number | string
}

export interface IndexViewEmits {
  onChange?: StickyViewOnChange
}

export type IndexViewItemProps = StickyViewItemProps

export interface IndexViewRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
}

export type { StickyViewOnChange as IndexViewOnChange }
