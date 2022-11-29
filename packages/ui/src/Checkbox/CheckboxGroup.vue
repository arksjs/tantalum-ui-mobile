<template>
  <div class="ta-checkbox-group" :class="classes" ref="root">
    <slot>
      <Checkbox
        v-for="item in options2"
        :key="item.value"
        :checkedValue="item.value"
        >{{ item.label }}</Checkbox
      >
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue'
import Checkbox from './Checkbox.vue'
import {
  isStringOrNumberArray,
  cloneData,
  isSameArray,
  type PropsToEmits
} from '../helpers'
import { useCheckGroup } from './use-check'
import type { CheckboxGroupEmits, ModelValue } from './types'
import { checkGroupProps } from './props'

const isValue = (value: ModelValue[]) => isStringOrNumberArray(value)

export default defineComponent({
  name: 'ta-checkbox-group',
  components: { Checkbox },
  props: {
    ...checkGroupProps,
    modelValue: {
      type: Array as PropType<ModelValue[]>,
      validator: isValue,
      default: (): string[] => []
    }
  },
  emits: {
    'update:modelValue': isValue,
    change: isValue
  } as PropsToEmits<CheckboxGroupEmits>,
  setup(props, ctx) {
    const inputValue = ref<ModelValue[]>([])
    const { emit } = ctx

    const group = useCheckGroup(props, {
      name: 'checkbox',
      updateValue({ isChange, children }) {
        const newVal: ModelValue[] = []

        children.forEach(child => {
          if (child.getInputChecked()) {
            newVal.push(cloneData(child.getValue()))
          }
        })

        inputValue.value = newVal

        if (isChange && !isSameArray(newVal, props.modelValue)) {
          emit('update:modelValue', cloneData(newVal))
        }

        if (isChange) {
          emit('change', cloneData(newVal))
        }

        return newVal
      },
      watchValue({ children, value }) {
        if (
          isStringOrNumberArray(value) &&
          !isSameArray(value, inputValue.value)
        ) {
          const newVal: ModelValue[] = []

          children.forEach(child => {
            const checked = value.includes(child.getValue())
            child.setChecked(checked)
            checked && newVal.push(child.getValue())
          })

          inputValue.value = newVal
        }
      }
    })

    return {
      ...group
    }
  }
})
</script>
