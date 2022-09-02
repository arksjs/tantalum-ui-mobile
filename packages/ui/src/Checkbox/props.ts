import type { PropType } from 'vue'
import type { CheckCommonEmits, UserOptionItem } from './types'
import { formItemProps } from '../Form/form'
import { colorValidator } from '../helpers/validator'
import type { PropsToEmits } from '../helpers/types'
import { isBoolean } from '../helpers/util'

export const checkGroupProps = {
  ...formItemProps,
  options: {
    type: Array as PropType<UserOptionItem[]>,
    default: () => [] as UserOptionItem[]
  },
  inline: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String
  }
}

export const checkEmits: PropsToEmits<CheckCommonEmits> = {
  'update:checked': checked => isBoolean(checked),
  change: checked => isBoolean(checked)
}

export const checkProps = {
  value: {
    type: [Number, String],
    default: ''
  },
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  activeColor: {
    type: String,
    validator: colorValidator
  },
  name: {
    type: String,
    default: ''
  }
}
