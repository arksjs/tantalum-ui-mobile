<template>
  <div
    class="fx-circle-progress"
    :style="{ fontSize: Math.max(9, nSize * 0.17 * 0.875) + 'px' }"
  >
    <LoadingIcon
      class="fx-circle-progress_bar"
      :size="nSize"
      :rate="rate"
      :strokeWidth="strokeWidth"
      :color="color"
    />
    <div
      class="fx-circle-progress_text"
      :style="{ padding: (strokeWidth ?? DEFAULT_STROKE_WIDTH) + 'px' }"
    >
      <slot :progress="progress">
        {{ progress }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { LoadingIcon } from '../LoadingIcon'
import { getNumber, isNumeric, rangeInteger } from '../helpers/util'
import { colorValidator } from '../helpers/validator'
import { getFontSize } from './util'
import { DEFAULT_SIZE, DEFAULT_STROKE_WIDTH } from '../LoadingIcon/util'

export default defineComponent({
  name: 'fx-circle-progress',
  components: { LoadingIcon },
  props: {
    percentage: {
      type: [Number, String],
      validator: (val: number | string) =>
        isNumeric(val) && getNumber(val) >= 0 && getNumber(val) <= 100,
      default: 0,
      required: true
    },
    size: {
      type: [Number, String],
      default: DEFAULT_SIZE
    },
    strokeWidth: {
      type: [Number, String],
      default: DEFAULT_STROKE_WIDTH
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const nSize = computed(() => parseFloat(props.size as string))
    const rate = computed(() => rangeInteger(props.percentage, 0, 100) / 100)
    const progress = computed(
      () => rangeInteger(props.percentage, 0, 100) + '%'
    )
    const fontSize = computed(() => getFontSize(nSize.value))

    return {
      nSize,
      rate,
      progress,
      fontSize,
      DEFAULT_STROKE_WIDTH
    }
  }
})
</script>
