import { isNumber, type VoidFnToBooleanFn } from '../helpers'
import type { OnActiveIndexChange } from './types'

export const emitChangeValidator: VoidFnToBooleanFn<OnActiveIndexChange> = (
  activeIndex,
  fromIndex
) => isNumber(activeIndex) && isNumber(fromIndex)
