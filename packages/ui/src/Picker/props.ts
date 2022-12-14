import type { PropType } from 'vue'
import { isString, isStringOrNumber, type PropsToEmits } from '../helpers'
import type {
  PickerEmits,
  PickerPopupEmits,
  PickerCommonEmits,
  UserFieldNames,
  UserOptionItem,
  PickerDetail
} from './types'
import type {
  SelectorValue,
  SelectorModelValue,
  SelectorSourceDetail,
  SelectorValueParser,
  SelectorValueFormatter
} from '../SelectorField/types'
import { getDefaultFieldNames } from './util'
import { formActiveEmits, formItemProps } from '../Form/form'
import { popupEmits, popupExtendProps } from '../popup/props'

const isValue = (value: SelectorValue) => {
  return isStringOrNumber(value) || value instanceof Date
}

const isModelValue = (value: SelectorModelValue) => {
  if (Array.isArray(value)) {
    return (
      value.filter(v => {
        return !isValue(v)
      }).length === 0
    )
  }
  return isValue(value)
}

export const isPickerDetail = <T extends SelectorSourceDetail>(detail: T) => {
  return detail && detail.value && isString(detail.label)
}

export const commonProps = {
  modelValue: {
    type: [Date, String, Number, Array] as PropType<SelectorModelValue>
  },
  options: {
    type: Array as PropType<UserOptionItem[]>,
    default: () => [] as UserOptionItem[]
  },
  fieldNames: {
    type: Object as PropType<UserFieldNames>,
    default: getDefaultFieldNames()
  },
  formatter: {
    type: Function as PropType<SelectorValueFormatter>
  },
  parser: {
    type: Function as PropType<SelectorValueParser>
  }
}

export const commonEmits: PropsToEmits<PickerCommonEmits> = {
  change: isModelValue,
  'update:modelValue': isModelValue
}

/**
 * view
 */
export const pickerViewProps = commonProps

export const pickerViewEmits = commonEmits

/**
 * popup
 */
export const pickerPopupProps = {
  ...popupExtendProps
}

export const pickerPopupEmits: PropsToEmits<PickerPopupEmits> = {
  ...popupEmits,
  ...commonEmits,
  confirm: (payload: PickerDetail) => isPickerDetail(payload)
}

/**
 * input
 */
export const pickerProps = {
  ...formItemProps,
  placeholder: {
    type: String,
    default: ''
  }
}

export const pickerEmits: PropsToEmits<PickerEmits> = {
  ...commonEmits,
  ...formActiveEmits
}
