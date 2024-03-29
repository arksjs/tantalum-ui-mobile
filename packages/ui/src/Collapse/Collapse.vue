<template>
  <div class="ta-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, type PropType } from 'vue'
import {
  cloneData,
  isSameArray,
  isString,
  isStringArray,
  isStringOrStringArray,
  type PropsToEmits
} from '../helpers'
import { useGroup } from '../hooks'
import { CollapseContext } from './context'
import type { CollapseContextValue, CollapseEmits, CollapseContextItemRef } from './types'

export default defineComponent({
  name: 'ta-collapse',
  props: {
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      validator: isStringOrStringArray,
      default: () => [] as string[]
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': payload => isStringArray(payload),
    change: payload => isStringArray(payload)
  } as PropsToEmits<CollapseEmits>,
  setup(props, { emit }) {
    let activeNames: string[] = []

    const { children } = useGroup<CollapseContextValue, CollapseContextItemRef>(CollapseContext, {
      onChange,
      hasGroup: true
    })

    function updateValue(val: string | string[]) {
      let values = cloneData(isStringArray(val) ? val : isString(val) ? [val] : [])

      if (props.accordion) {
        // 手风琴模式只保留一个值
        values = values.slice(0, 1)
      }

      if (Array.isArray(values) && isSameArray(values, activeNames)) {
        return
      }

      activeNames = []

      children.forEach(child => {
        const childName = child.getName()

        if (childName && values.includes(childName)) {
          activeNames.push(childName)
          child.show()
        } else {
          child.hide()
        }
      })
    }

    function onChange(uid: symbol) {
      activeNames = []

      if (props.accordion) {
        children.forEach(child => {
          if (child.uid === uid) {
            child.getActive() && child.getName() && activeNames.push(child.getName())
          } else {
            child.hide()
          }
        })
      } else {
        children.forEach(child => {
          child.getActive() && child.getName() && activeNames.push(child.getName())
        })
      }

      emit('update:modelValue', cloneData(activeNames))
      emit('change', cloneData(activeNames))
    }

    onMounted(() => updateValue(props.modelValue))

    watch(() => props.modelValue, updateValue, {
      deep: true
    })

    return {}
  }
})
</script>
