import type { PropType } from 'vue'
import {
  selectorValidator,
  createEnumsValidator,
  getEnumsValue,
  PLACEMENT_TYPES,
  type PlacementType,
  type PropsToEmits,
  type Selector
} from '../helpers'
import { popupEmits, popupProps } from '../popup/props'
import type { PopoverEmits } from './types'

export const popoverProps = {
  ...popupProps,
  selector: {
    type: [String, HTMLElement] as PropType<Selector>,
    validator: selectorValidator,
    required: true
  },
  placement: {
    type: String as PropType<PlacementType>,
    validator: createEnumsValidator(PLACEMENT_TYPES),
    default: getEnumsValue(PLACEMENT_TYPES)
  },
  showMask: {
    type: Boolean,
    default: true
  }
}

export const popoverEmits: PropsToEmits<PopoverEmits> = { ...popupEmits }
