<template>
  <div class="ak-radio-group" :class="classes" ref="root">
    <slot>
      <Radio
        v-for="item in options2"
        :key="item.value"
        :checkedValue="item.value"
        >{{ item.label }}</Radio
      >
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Radio from './Radio.vue'
import { useCheckGroup } from '../Checkbox/use-check'
import type { ModelValue } from '../Checkbox/types'
import { checkGroupProps } from '../Checkbox/props'
import { isStringNumberMix } from '../helpers/util'
import type { PropsToEmits } from '../helpers/types'
import type { RadioGroupEmits } from './types'

const isValue = (value: ModelValue) => isStringNumberMix(value)

export default defineComponent({
  name: 'ak-radio-group',
  components: { Radio },
  props: {
    ...checkGroupProps,
    modelValue: {
      type: [Number, String],
      validator: isValue,
      default: null
    }
  },
  emits: {
    'update:modelValue': isValue,
    change: isValue
  } as PropsToEmits<RadioGroupEmits>,
  setup(props, ctx) {
    const inputValue = ref<ModelValue>('')
    const { emit } = ctx

    const group = useCheckGroup(props, {
      name: 'radio',
      updateValue({ isChange, uid, children }) {
        let hasChecked = false
        let value: ModelValue = ''

        children.forEach(child => {
          const checked = uid ? uid === child.uid : child.getInputChecked()

          if (!hasChecked && checked) {
            hasChecked = true
            value = child.getValue()
            child.setChecked(true)
          } else {
            child.setChecked(false)
          }
        })

        inputValue.value = value

        if (isChange && inputValue.value !== props.modelValue) {
          emit('update:modelValue', value)
        }

        if (isChange) {
          emit('change', value)
        }

        return value
      },
      watchValue({ children, value }) {
        let hasChecked = false

        children.forEach(child => {
          if (!hasChecked && child.getValue() === value) {
            hasChecked = true
            inputValue.value = value
            child.setChecked(true)
          } else {
            child.setChecked(false)
          }
        })
      }
    })

    return {
      ...group
    }
  }
})
</script>
