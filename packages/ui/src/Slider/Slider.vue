<template>
  <div :class="slideClasses" :style="slideStyles">
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
        <div class="ta-slider_track" :style="{ width: progress * 100 + '%' }"></div>
        <div class="ta-slider_thumb" data-thumb="true" :style="{ left: progress * 100 + '%' }">
          {{ showValue ? inputValue : '' }}
        </div>
      </div>
      <input type="hidden" :name="name" :disabled="disabled" :value="inputValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, nextTick } from 'vue'
import { isNumeric, type PropsToEmits } from '../helpers'
import { formNumberValueEmits, formItemProps } from '../Form/form'
import { slideProps } from './props'
import { useSlide } from './use-slide'
import type { SliderEmits } from './types'

export default defineComponent({
  name: 'ta-slider',
  props: {
    ...formItemProps,
    ...slideProps,
    modelValue: {
      type: [Number, String],
      validator: isNumeric
    }
  },
  emits: {
    ...formNumberValueEmits
  } as PropsToEmits<SliderEmits>,
  setup(props, ctx) {
    const progress = ref(0)
    const inputValue = ref(0)
    const { emit } = ctx

    const {
      toInteger,
      rangeValue,
      value2Progress,
      slideClasses,
      slideStyles,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart
    } = useSlide(props, {
      getValue() {
        return inputValue.value
      },
      move({ value: newVal, progress: newProgress }) {
        inputValue.value = newVal
        progress.value = newProgress

        emitModel()
        emit('input', inputValue.value)
      },
      end({ isChange }) {
        isChange && emit('change', inputValue.value)
      }
    })

    function emitModel() {
      if (props.modelValue == null || inputValue.value !== toInteger(props.modelValue)) {
        emit('update:modelValue', inputValue.value)
        return true
      }
      return false
    }

    function updateValue(val: unknown) {
      if (val == null) {
        return
      }

      let newVal = toInteger(val as string)

      if (isNaN(newVal)) {
        return
      }

      newVal = rangeValue(newVal)

      if (newVal !== inputValue.value) {
        inputValue.value = newVal
        progress.value = value2Progress(newVal)
      }
    }

    watch(
      () => props.modelValue,
      val => updateValue(val)
    )

    watch([() => props.min, () => props.max], () => {
      nextTick(() => {
        updateValue(inputValue.value)

        if (emitModel()) {
          emit('change', inputValue.value)
        }
      })
    })

    updateValue(props.modelValue || 0)

    if (emitModel()) {
      emit('change', inputValue.value)
    }

    return {
      progress,
      inputValue,
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
