<template>
  <div class="ta-range" :class="slideClasses" :style="slideStyles">
    <div
      class="ta-slider_inner"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mousedown="onTouchStart"
      @mousemove="onTouchMove"
      @mouseup="onTouchEnd"
      @mouseleave="onTouchEnd"
      @dragstart="onDragStart"
    >
      <div class="ta-slider_box">
        <div
          class="ta-slider_track"
          :style="{
            left: Math.min(progress[0], progress[1]) * 100 + '%',
            width: Math.abs(progress[1] - progress[0]) * 100 + '%'
          }"
        ></div>
        <div
          class="ta-slider_thumb"
          data-thumb="true"
          data-index="0"
          :style="{ left: progress[0] * 100 + '%' }"
        >
          {{ showValue ? progressValue[0] : '' }}
        </div>
        <div
          class="ta-slider_thumb"
          data-thumb="true"
          data-index="1"
          :style="{ left: progress[1] * 100 + '%' }"
        >
          {{ showValue ? progressValue[1] : '' }}
        </div>
      </div>
      <input type="hidden" :name="name" :disabled="disabled" :value="inputValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, nextTick, reactive, computed, type PropType } from 'vue'
import { cloneData, isNumberArray, isSameArray, isString, type PropsToEmits } from '../helpers'
import { formItemProps } from '../Form/form'
import { slideProps } from '../Slider/props'
import { useSlide } from '../Slider/use-slide'
import type { RangeEmits } from './types'

const isValue = (value: number[]) => isNumberArray(value)

export default defineComponent({
  name: 'ta-range',
  props: {
    ...formItemProps,
    ...slideProps,
    modelValue: {
      type: Array as PropType<number[]>,
      validator: isValue
    },
    allowSameValue: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:modelValue': isValue,
    change: isValue,
    input: isValue
  } as PropsToEmits<RangeEmits>,
  setup(props, ctx) {
    const progress = reactive<number[]>([0, 0])
    const progressValue = reactive<number[]>([0, 0])
    const { emit } = ctx

    const {
      toInteger,
      rangeValue,
      value2Progress,
      getMinMax,
      slideClasses,
      slideStyles,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart
    } = useSlide(props, {
      getValue($target) {
        const { thumb, index } = $target.dataset

        return thumb ? progressValue[parseInt(index as string)] : 0
      },
      move({ value: newVal, progress: newProgress, $target }) {
        const { thumb } = $target.dataset
        let index = 0

        if (thumb) {
          index = parseInt($target.dataset.index as string)
        } else {
          if (Math.abs(progressValue[0] - newVal) > Math.abs(progressValue[1] - newVal)) {
            index = 1
          }
        }
        if (!props.allowSameValue && newVal === progressValue[1 - index]) {
          // 不允许重叠
        } else {
          progressValue[index] = newVal
          progress[index] = newProgress

          emitModel()
          emit('input', getValue())
        }
      },
      end({ isChange }) {
        isChange && emit('change', getValue())
      }
    })

    function valueHandler(val: unknown) {
      let newVal: number[] = []

      if (isNumberArray(val) && val.length > 1) {
        newVal = cloneData(val)
      } else if (isString(val)) {
        newVal = val.split(',').map(v => {
          return toInteger(v)
        })

        if (newVal.length < 2) {
          newVal = []
        }
      }

      return newVal.slice(0, 2).sort(sortBy)
    }

    function getValue() {
      return valueHandler(progressValue)
    }

    function sortBy(a: number, b: number) {
      return a - b
    }

    function emitModel() {
      if (props.modelValue == null || getValue() !== valueHandler(props.modelValue)) {
        emit('update:modelValue', getValue())
        return true
      }
      return false
    }

    function rangeValues(vals: number[]) {
      vals[0] = rangeValue(vals[0])
      vals[1] = rangeValue(vals[1])

      return vals
    }

    function updateValue(val: unknown) {
      let newVal = valueHandler(val)

      if (newVal.length === 0) {
        return
      }
      newVal = rangeValues(newVal)

      if (!isSameArray(newVal, getValue())) {
        progressValue[0] = newVal[0]
        progressValue[1] = newVal[1]
        progress[0] = value2Progress(newVal[0])
        progress[1] = value2Progress(newVal[1])
      }
    }

    watch(
      () => props.modelValue,
      val => updateValue(val)
    )

    watch([() => props.min, () => props.max], () => {
      nextTick(() => {
        updateValue(progressValue)
        if (emitModel()) {
          emit('change', getValue())
        }
      })
    })

    const inputValue = computed(() => {
      return getValue().join(',')
    })

    updateValue(getMinMax())
    updateValue(props.modelValue)

    if (emitModel()) {
      emit('change', getValue())
    }

    return {
      inputValue,
      progress,
      progressValue,
      slideClasses,
      slideStyles,

      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart
    }
  }
})
</script>
