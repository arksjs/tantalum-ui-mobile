import type { PropType } from 'vue'
import {
  isNumber,
  isStringNumberMix,
  colorValidator,
  type PropsToEmits
} from '../helpers'
import type { OptionItem, OptionList, TabCommonEmits } from './types'

export const tabEmits: PropsToEmits<TabCommonEmits> = {
  'update:modelValue': value => isStringNumberMix(value),
  change: (value, index) => isStringNumberMix(value) && isNumber(index)
}

export const tabProps = {
  options: {
    type: Array as PropType<OptionList>,
    validator: (val: OptionList) => {
      if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          const option = val[i]

          if (typeof option === 'string' || typeof option === 'number') {
            //
          } else if (
            option &&
            typeof option.label === 'string' &&
            isStringNumberMix(option.value)
          ) {
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
    type: [Number, String] as PropType<number | string>
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
