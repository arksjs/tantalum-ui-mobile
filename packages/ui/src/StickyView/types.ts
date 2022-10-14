import type { ResetContainer } from '../Sticky/types'

export interface StickyViewItem {
  name: string
  index: number
  title: string
}

export type OnResetItems = (items: StickyViewItem[]) => void

export type OnChange = (name: string, activeIndex: number) => void

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
  modelValue?: string
  containSelector?: HTMLElement
  offsetTop?: number | string
  disabled?: false
}

export interface StickyViewEmits {
  onChange?: OnChange
  onResetItems?: OnResetItems
}

export interface StickyViewItemProps {
  name: string
  title?: string
}

export type { OnChange as StickyViewOnChange }
