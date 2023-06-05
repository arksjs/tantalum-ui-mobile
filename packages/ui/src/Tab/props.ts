import type { PropType } from 'vue'
import { isNumber, isStringOrNumber, colorValidator, type PropsToEmits, isString } from '../helpers'
import type { OptionItem, OptionList, TabCommonEmits } from './types'

export const tabEmits: PropsToEmits<TabCommonEmits> = {
  'update:modelValue': value => isStringOrNumber(value),
  change: (value, index) => isStringOrNumber(value) && isNumber(index)
}

export const tabProps = {
  options: {
    type: Array as PropType<OptionList>,
    validator: (val: OptionList) => {
      if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          const option = val[i]

          if (isStringOrNumber(option)) {
            //
          } else if (option && isString(option.label) && isStringOrNumber(option.value)) {
            //
          } else {
            return false
          }
        }
      } else {
        return false
      }

      return true
    },
    required: true,
    default: () => [] as OptionItem[]
  },
  modelValue: {
    type: [Number, String]
  },
  color: {
    type: String,
    validator: colorValidator
  },
  activeColor: {
    type: String,
    validator: colorValidator
  }
}
