import { isNumber } from '../helpers/util'
import type { VoidFnToBooleanFn } from '../helpers/types'
import type { OnChange } from './types'

export const emitChangeValidator: VoidFnToBooleanFn<OnChange> = (
  activeIndex,
  fromIndex
) => isNumber(activeIndex) && isNumber(fromIndex)
