<template>
  <div class="ak-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, provide } from 'vue'
import type { PropType } from 'vue'
import { cloneData, isSameArray, isStringNumberMixArray } from '../helpers/util'
import { stringNumberArrayMixValidator } from '../helpers/validator'
import { useGroup } from '../hooks/use-group'
import type { ActiveName, CollapseEmits } from './types'
import type { PropsToEmits } from '../helpers/types'

export default defineComponent({
  name: 'ak-collapse',
  props: {
    modelValue: {
      type: [Number, String, Array] as PropType<ActiveName | ActiveName[]>,
      validator: stringNumberArrayMixValidator,
      default: () => [] as ActiveName[]
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': payload => isStringNumberMixArray(payload),
    change: payload => isStringNumberMixArray(payload)
  } as PropsToEmits<CollapseEmits>,
  setup(props, { emit }) {
    let activeNames: ActiveName[] = []

    const { children } = useGroup('collapse')

    function updateValue(val: ActiveName | ActiveName[]) {
      let values = cloneData(
        stringNumberArrayMixValidator(val)
          ? Array.isArray(val)
            ? val
            : [val]
          : []
      )

      if (props.accordion) {
        // 手风琴模式只保留一个值
        values = values.slice(0, 1)
      }

      if (Array.isArray(values) && isSameArray(values, activeNames)) {
        return
      }

      activeNames = []

      children.forEach(child => {
        const childName = child.getName() as ActiveName

        if (childName && values.includes(childName)) {
          activeNames.push(childName)
          child.show()
        } else {
          child.hide()
        }
      })
    }

    function onChange(uid: number) {
      activeNames = []

      if (props.accordion) {
        children.forEach(child => {
          if (child.uid === uid) {
            child.getActive() &&
              child.getName() &&
              activeNames.push(child.getName())
          } else {
            child.hide()
          }
        })
      } else {
        children.forEach(child => {
          child.getActive() &&
            child.getName() &&
            activeNames.push(child.getName())
        })
      }

      emit('update:modelValue', cloneData(activeNames))
      emit('change', cloneData(activeNames))
    }

    onMounted(() => updateValue(props.modelValue))

    watch(
      () => props.modelValue,
      val => updateValue(val)
    )

    provide('akCollapseChange', onChange)

    return {}
  }
})
</script>
