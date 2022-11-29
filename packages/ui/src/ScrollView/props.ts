import { isNumber, isString, type VoidFnToBooleanFn } from '../helpers'
import type {
  OnRefreshing,
  OnScroll,
  OnScrollToLower,
  OnScrollToUpper
} from './types'

export const emitScrollValidator: VoidFnToBooleanFn<OnScroll> = payload =>
  payload && isNumber(payload.scrollTop) && isNumber(payload.scrollLeft)

export const emitRefreshingValidator: VoidFnToBooleanFn<OnRefreshing> = (
  payload,
  loadComplete
) =>
  payload &&
  isString(payload.pullDirection) &&
  typeof loadComplete === 'function'

export const emitScrollToUpperValidator: VoidFnToBooleanFn<
  OnScrollToUpper
> = payload => payload && ['top', 'left'].includes(payload.direction)

export const emitScrollToLowerValidator: VoidFnToBooleanFn<
  OnScrollToLower
> = payload => payload && ['bottom', 'right'].includes(payload.direction)
