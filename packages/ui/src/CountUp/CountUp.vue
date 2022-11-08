<template>
  <div class="ta-count-up">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { getNumber, isNumber } from '../helpers/util'
import { thousands } from '../helpers/digital-conversion'
import type { CountUpEmits, OnCancel, Speed } from './types'
import type { PropsToEmits, VoidFnToBooleanFn } from '../helpers/types'
import { getDuration, SpeedMap } from './util'
import { useFrameTask } from '../hooks/use-frame-task'

const emitValidator: VoidFnToBooleanFn<OnCancel> = payload =>
  payload && isNumber(payload.number)

export default defineComponent({
  name: 'ta-count-up',
  props: {
    // 初始数值
    initialNumber: {
      type: [Number, String],
      default: 0
    },
    // 目标数值
    number: {
      type: [Number, String],
      default: 0
    },
    // 持续时间
    speed: {
      type: [Number, String] as PropType<Speed>,
      validator: (val: Speed) => isNumber(val) || SpeedMap.get(val) != null,
      default: 'normal'
    },
    // 是否千分位展示
    thousands: {
      type: Boolean,
      default: false
    },
    // 小数位数
    decimalDigits: {
      type: [Number, String],
      default: 0
    }
  },
  emits: {
    animated: emitValidator,
    cancel: emitValidator
  } as PropsToEmits<CountUpEmits>,
  setup(props, { emit }) {
    const content = ref('')
    let numberCache = getNumber(props.initialNumber, 0)

    const { getRunFrameTaskId, frameStart, frameStop } = useFrameTask()

    function cancel() {
      if (getRunFrameTaskId() !== null) {
        frameStop()
        emit('cancel', { number: numberCache })
      }
    }

    function update(newNumber: number) {
      cancel()

      const decimalDigits = getNumber(props.decimalDigits, 0)
      const carry = Math.pow(10, decimalDigits)
      const from = Math.round(numberCache * carry)
      const to = Math.round(newNumber * carry)

      frameStart({
        from,
        to,
        duration: getDuration(newNumber - numberCache, props.speed),
        progress: ({ current }) => {
          numberCache = parseFloat((current / carry).toFixed(decimalDigits))
          content.value = props.thousands
            ? thousands(numberCache.toFixed(decimalDigits))
            : numberCache.toFixed(decimalDigits)
        },
        complete: () => {
          emit('animated', { number: numberCache })
        }
      })
    }

    watch(
      () => props.number,
      val => {
        if (val != null && getNumber(val) !== numberCache) {
          update(getNumber(val))
        }
      },
      { immediate: true }
    )

    return {
      content,
      cancel
    }
  }
})
</script>
