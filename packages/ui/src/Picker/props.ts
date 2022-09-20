import type { PropType } from 'vue'
import type { PropsToEmits } from '../helpers/types'
import type {
  PickerEmits,
  PickerPopupEmits,
  PickerCommonEmits,
  UserFieldNames,
  UserOptionItem
} from './types'
import type {
  SelectorValue,
  SelectorModelValue,
  SelectorDetail,
  SelectorValueParser,
  SelectorValueFormatter
} from '../SelectorField/types'
import { isStringNumberMix } from '../helpers/util'
import { getDefaultFieldNames } from './util'
import { formActiveEmits, formItemProps } from '../Form/form'
import { popupEmits, popupExtendProps } from '../popup/popup'

const isValue = (value: SelectorValue) => {
  return isStringNumberMix(value) || value instanceof Date
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

export const isPickerDetail = <T extends SelectorDetail = SelectorDetail>(
  detail: T
) => {
  return (
    detail && isModelValue(detail.value) && typeof detail.label === 'string'
  )
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
  confirm: (payload: SelectorDetail) => isPickerDetail(payload)
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
