import { isNumber, isString } from '../helpers/util'
import type { VoidFnToBooleanFn } from '../helpers/types'
import type { OnChange } from './types'

export const emitChangeValidator: VoidFnToBooleanFn<OnChange> = (
  name,
  activeIndex
) => isString(name) && isNumber(activeIndex)
