<template>
  <svg
    class="ak-loading-icon"
    :height="size"
    :width="size"
    viewBox="0 0 1024 1024"
  >
    <circle
      class="ak-loading-icon_track"
      r="448"
      cx="512"
      cy="512"
      :stroke-width="nStrokeWidth"
      fill="none"
      :style="{ stroke: backgroundColor }"
    ></circle>
    <circle
      class="ak-loading-icon_thumb"
      r="448"
      cx="512"
      cy="512"
      :stroke="color"
      :stroke-dasharray="314 * 8.96 * rate + ',' + 314 * 8.96"
      :stroke-width="nStrokeWidth"
      fill="none"
      transform="rotate(-90,512,512)"
      stroke-linecap="round"
      :style="{ stroke: color }"
    ></circle>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { colorValidator } from '../helpers/validator'
import { getRealStrokeWidth } from './util'

export default defineComponent({
  name: 'ak-loading-icon',
  props: {
    rate: {
      type: Number,
      default: 0,
      required: true
    },
    size: {
      type: [Number, String],
      default: 100
    },
    strokeWidth: {
      type: [Number, String],
      default: 5.37
    },
    color: {
      type: String,
      validator: colorValidator
    },
    backgroundColor: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const nStrokeWidth = computed(() => getRealStrokeWidth(props))

    return {
      nStrokeWidth
    }
  }
})
</script>
