import type {
  AnyObject,
  FnArgs,
  Noop,
  UniqueID,
  ViewPosition
} from '../helpers/types'

export interface ScrollToOptions {
  offset: number
  animated?: boolean
}

export interface ScrollToIndexOptions {
  index: number
  animated?: boolean
  viewPosition?: ViewPosition
}

export interface ScrollTo {
  (offset: number): void
  (options: ScrollToOptions): void
}

export interface ScrollToEnd {
  (animated?: boolean): void
}

export interface ScrollToIndex {
  (index: number): void
  (options: ScrollToIndexOptions): void
}

export interface VirtualListRef {
  scrollTo: ScrollTo
  scrollToIndex: ScrollToIndex
  scrollToEnd: ScrollToEnd
  recordInteraction: Noop
  resetScrollContainer: ($el: HTMLElement) => void
}

export type OnVisibleItemsChange = (payload: {
  items: {
    index: number
    visible: boolean
  }[]
}) => void

export type OnVisibleItemsChangePayload = FnArgs<OnVisibleItemsChange>[0]

export type ListItem = {
  id: UniqueID
  index: number
  style?: AnyObject
  size: number
}

export type RenderItem = {
  id: UniqueID
  index: number
  style?: AnyObject
  size: number
}

export interface VirtualListProps {
  ids: UniqueID[]
  itemSize?: number | ((index: number) => number)
  initialHorizontal?: boolean
  preLoad?: number
  initialWaterfallCount?: number
  approvedItemVisibleScale?: number
}

export interface VirtualListEmits {
  onVisibleItemsChange?: OnVisibleItemsChange
  onResize?: (size: number) => void
}

export type { OnVisibleItemsChange as VirtualListOnVisibleItemsChange }
