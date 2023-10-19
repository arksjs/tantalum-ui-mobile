import type { OptionItem } from '../Tab/types'
import type { Noop } from '../helpers'
import type { ResetContainer } from '../Sticky/types'
import type { OnScroll } from '../ScrollView/types'

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
  onScroll?: OnScroll
}

export interface StickyViewItemProps {
  name: string
  title?: string
  description?: string
}

export type PullRefreshTexts = {
  holding?: string
  refreshing?: string
  pullingUp?: string
  pullingDown?: string
}

export type OnRefreshing = (
  payload: {
    pullDirection: 'up' | 'down'
  },
  loadComplete: Noop
) => void

export interface StickyViewItem extends Required<StickyViewItemProps> {
  tabItemProps: Omit<OptionItem, 'label' | 'value'>
  index: number
}

export type {
  OnChange as StickyViewOnChange,
  OnResetItems as StickyViewOnResetItems,
  OnRefreshing as StickyViewOnPullRefreshing,
  PullRefreshTexts as StickyViewPullRefreshTexts,
  OnScroll as StickyViewOnScroll
}
