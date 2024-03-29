import type { Noop } from '../helpers'
import type { ScrollToEnd, ScrollToOffset } from '../hooks'

export type PullDirection = 'up' | 'right' | 'down' | 'left'
export type PullDirectionOrDefault = '' | PullDirection

export type OnScroll = (payload: {
  scrollTop: number
  scrollLeft: number
  scrollWidth: number
  scrollHeight: number
  clientHeight: number
  clientWidth: number
}) => void

export type OnRefreshing = (
  payload: {
    pullDirection: PullDirection
  },
  loadComplete: Noop
) => void

export type OnScrollToUpper = (payload: { direction: 'top' | 'left' }) => void
export type OnScrollToLower = (payload: { direction: 'bottom' | 'right' }) => void

export type PullRefreshTexts = {
  holding?: string
  refreshing?: string
  pullingUp?: string
  pullingDown?: string
  pullingLeft?: string
  pullingRight?: string
}

export interface ScrollViewProps {
  scrollX?: boolean // 允许横向滚动
  scrollY?: boolean // 允许纵向滚动
  scrollAnimated?: boolean // 在设置滚动条位置时使用动画过渡
  upperThreshold?: number // 距顶部/左边多远时，触发 scrolltoupper 事件
  lowerThreshold?: number // 距底部/右边多远时，触发 scrolltolower 事件
  scrollTop?: number // 设置竖向滚动条位置
  scrollLeft?: number // 设置横向滚动条位置
  enablePullDirections?: PullDirection | PullDirection[] // 下拉刷新方向
  pullRefreshThreshold?: number // 下拉刷新阈值
  pullRefreshTexts?: PullRefreshTexts // 下拉刷新提示文案
}

export interface ScrollViewEmits {
  onScrollToUpper?: OnScrollToUpper
  onScrollToLower?: OnScrollToLower
  onScroll?: OnScroll
  onRefreshing?: OnRefreshing
}

export interface PullIndicatorSafeArea {
  top: number
  right: number
  bottom: number
  left: number
}

export interface ScrollViewRef {
  scrollTo: ScrollToOffset
  scrollToEnd: ScrollToEnd
  getScrollEl: () => HTMLElement | null
}

export type {
  PullDirection as ScrollViewPullDirection,
  PullRefreshTexts as ScrollViewPullRefreshTexts,
  OnScrollToUpper as ScrollViewOnScrollToUpper,
  OnScrollToLower as ScrollViewOnScrollToLower,
  OnRefreshing as ScrollViewOnRefreshing,
  OnScroll as ScrollViewOnScroll
}
