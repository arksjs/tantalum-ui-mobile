import type { VoidFnToBooleanFn } from '../helpers/types'
import type {
  OnRefreshing,
  OnScroll,
  OnScrollToLower,
  OnScrollToUpper
} from './types'

export const emitScrollValidator: VoidFnToBooleanFn<OnScroll> = payload =>
  payload &&
  typeof payload.scrollTop === 'number' &&
  typeof payload.scrollLeft === 'number'

export const emitRefreshingValidator: VoidFnToBooleanFn<OnRefreshing> = (
  payload,
  loadComplete
) =>
  payload &&
  typeof payload.pullDirection === 'string' &&
  typeof loadComplete === 'function'

export const emitScrollToUpperValidator: VoidFnToBooleanFn<
  OnScrollToUpper
> = payload => payload && ['top', 'left'].includes(payload.direction)

export const emitScrollToLowerValidator: VoidFnToBooleanFn<
  OnScrollToLower
> = payload => payload && ['bottom', 'right'].includes(payload.direction)
