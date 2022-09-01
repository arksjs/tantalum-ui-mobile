import type { ResetContainer } from '../Sticky/types'

export interface StickyViewItem {
  name: string
  index: number
}

export type OnResetItems = (
  items: {
    name: string
    index: number
  }[]
) => void

export type OnChange = (activeIndex: number) => void

export interface ScrollToOptions {
  offset: number
}

export interface ScrollToIndexOptions {
  index: number
}

export interface ScrollTo {
  (offset: number): void
  (options: ScrollToOptions): void
}

export interface ScrollToIndex {
  (index: number): void
  (options: ScrollToIndexOptions): void
}

export interface StickyViewRef {
  scrollTo: ScrollTo
  scrollToIndex: ScrollToIndex
  resetContainer: ResetContainer
}

export interface StickyViewProps {
  activeIndex?: number
  containSelector?: HTMLElement
  offsetTop?: number | string
  disabled?: false
}

export interface StickyViewEmits {
  onChange?: OnChange
  onUpdateActiveIndex?: OnChange
  onResetItems?: OnResetItems
}

export interface StickyViewItemProps {
  name?: string | number
}
