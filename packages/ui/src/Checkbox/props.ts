import type { PropType } from 'vue'
import type { CheckCommonEmits, UserOptionItem } from './types'
import { formItemProps } from '../Form/form'
import { colorValidator, isBoolean, type PropsToEmits } from '../helpers'

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
  checkedChange: checked => isBoolean(checked)
}

export const checkProps = {
  checkedValue: {
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
