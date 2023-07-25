import type { OnRefreshing, PullRefreshTexts } from '../ScrollView/types'
import type { StickyViewItemProps, StickyViewOnChange } from '../StickyView/types'

export interface ScrollTabProps {
  modelValue?: string
  stickyOffsetTop?: number | string
  stickyOffsetBottom?: number | string
}

export interface ScrollTabEmits {
  onChange?: StickyViewOnChange
  onPullRefreshing?: OnRefreshing
}

export type ScrollTabItemProps = StickyViewItemProps

export interface ScrollTabRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
}

export type {
  StickyViewOnChange as ScrollTabOnChange,
  OnRefreshing as ScrollTabOnPullRefreshing,
  PullRefreshTexts as ScrollTabPullRefreshTexts
}
