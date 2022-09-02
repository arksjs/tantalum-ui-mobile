import type { CSSProperties } from '../helpers/types'
import type { PullDirectionOrDefault, PullIndicatorSafeArea } from './types'

export const ScrollState = {
  Center: 0,
  Upper: 1,
  Lower: 2
}

export const PullRefreshState = {
  Pulling: 0,
  Holding: 1,
  Refreshing: 2
}

export const getContentStyles = ({
  translateDuration,
  pullDirection,
  pullDistance
}: {
  translateDuration: number
  pullDirection: PullDirectionOrDefault
  pullDistance: number
}) => {
  return {
    transition: `transform ${translateDuration}ms`,
    transform: ['up', 'down'].includes(pullDirection)
      ? `translate3d(0, ${pullDistance}px, 0)`
      : `translate3d(${pullDistance}px, 0, 0)`
  } as CSSProperties
}

export const getIndicatorStyles = (
  pullIndicatorSafeArea: PullIndicatorSafeArea
) => {
  return {
    padding: `${pullIndicatorSafeArea.top}px ${pullIndicatorSafeArea.right}px ${pullIndicatorSafeArea.bottom}px ${pullIndicatorSafeArea.left}px`
  }
}

export const getClasses = ({
  scrollX,
  scrollY,
  scrollAnimated
}: {
  scrollX: boolean
  scrollY: boolean
  scrollAnimated: boolean
}) => [
  'ak-scroll-view',
  {
    'scroll-x': scrollX,
    'scroll-y': scrollY,
    smooth: scrollAnimated
  }
]

export const getPullRefreshClasses = (
  pullDirection: PullDirectionOrDefault
) => [
  'ak-scroll-view_pull-refresh',
  'direction--' + (pullDirection || 'unknown')
]

export const getLoadMoreClasses = (pullDirection: PullDirectionOrDefault) => [
  'ak-load-more',
  {
    vertical: pullDirection === 'left' || pullDirection === 'right'
  }
]
