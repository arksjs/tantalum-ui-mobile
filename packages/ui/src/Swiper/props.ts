import { isNumber } from '../helpers/util'
import type { VoidFnToBooleanFn } from '../helpers/types'
import type { OnActiveIndexChange } from './types'

export const emitChangeValidator: VoidFnToBooleanFn<OnActiveIndexChange> = (
  activeIndex,
  fromIndex
) => isNumber(activeIndex) && isNumber(fromIndex)
