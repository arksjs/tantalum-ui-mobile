import type { OptionItem, TabProps } from '../Tab/types'
import type {
  StickyViewItemProps,
  StickyViewOnChange,
  StickyViewOnScroll,
  OnRefreshing,
  PullRefreshTexts
} from '../StickyView/types'

export interface ScrollTabProps {
  modelValue?: string
  stickyOffsetTop?: number | string
  stickyOffsetBottom?: number | string
}

export interface ScrollTabEmits {
  onChange?: StickyViewOnChange
  onPullRefreshing?: OnRefreshing
  onScroll?: StickyViewOnScroll
}

export type ScrollTabItemProps = StickyViewItemProps

export interface ScrollTabRef {
  scrollTo: (name: string) => void
  scrollToIndex: (index: number) => void
}

export type ScrollTabTabProp = Omit<TabProps, 'modelValue' | 'options'>

export type ScrollTabItemTabItemProps = Omit<OptionItem, 'label' | 'value'>

export type {
  StickyViewOnChange as ScrollTabOnChange,
  OnRefreshing as ScrollTabOnPullRefreshing,
  StickyViewOnScroll as ScrollTabOnScroll,
  PullRefreshTexts as ScrollTabPullRefreshTexts
}
