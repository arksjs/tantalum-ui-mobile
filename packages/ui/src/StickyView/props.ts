import { isNumber, isString, type VoidFnToBooleanFn } from '../helpers'
import type { OnChange } from './types'

export const emitChangeValidator: VoidFnToBooleanFn<OnChange> = (
  name,
  activeIndex
) => isString(name) && isNumber(activeIndex)
