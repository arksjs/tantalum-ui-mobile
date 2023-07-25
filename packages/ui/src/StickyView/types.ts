import type { OnRefreshing, PullRefreshTexts } from '../ScrollView/types'
import type { ResetContainer } from '../Sticky/types'

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
  disabledHeader?: boolean
}

export interface StickyViewEmits {
  onChange?: OnChange
  onResetItems?: OnResetItems
  onPullRefreshing?: OnRefreshing
}

export interface StickyViewItemProps {
  name: string
  title?: string
  description?: string
}

export interface StickyViewItem extends Required<StickyViewItemProps> {
  index: number
}

export type {
  OnChange as StickyViewOnChange,
  OnResetItems as StickyViewOnResetItems,
  OnRefreshing as StickyViewOnPullRefreshing,
  PullRefreshTexts as StickyViewPullRefreshTexts
}
