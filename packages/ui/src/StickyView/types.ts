import type { ShallowRef } from 'vue'
import type { ResetContainer } from '../Sticky/types'

export interface StickyViewItem {
  name: string
  index: number
  title: string
}

export type OnResetItems = (items: StickyViewItem[]) => void

export type OnChange = (name: string, activeIndex: number) => void

export interface StickyViewListRef {
  ref: HTMLElement
}

export interface StickyViewRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
  scrollToOffset: (offset: number) => void
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

export type {
  OnChange as StickyViewOnChange,
  OnResetItems as StickyViewOnResetItems
}
