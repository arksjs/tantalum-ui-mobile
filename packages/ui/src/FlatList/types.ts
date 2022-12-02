import type { Noop } from '../helpers'
import type { OnRefreshing, OnScroll } from '../ScrollView/types'
import type {
  ScrollTo,
  ScrollToIndex,
  ScrollToEnd,
  OnVisibleItemsChange,
  VirtualListProps
} from '../VirtualList/types'

export type OnEndReached = (payload: { distanceFromEnd: number }) => void

export interface FlatListProps extends VirtualListProps {
  endReachedThreshold?: number
  enablePullRefresh?: boolean
  lowerLoading?: boolean
}

export interface FlatListEmits {
  onEndReached?: OnEndReached
  onRefreshing?: OnRefreshing
  onScroll?: OnScroll
  onVisibleItemsChange?: OnVisibleItemsChange
}

export interface FlatListRef {
  scrollTo: ScrollTo
  scrollToIndex: ScrollToIndex
  scrollToEnd: ScrollToEnd
  recordInteraction: Noop
}

export type {
  OnEndReached as FlatListOnEndReached,
  OnRefreshing as FlatListOnRefreshing,
  OnScroll as FlatListOnScroll,
  OnVisibleItemsChange as FlatListOnVisibleItemsChange
}
