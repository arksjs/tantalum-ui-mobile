<template>
  <div :class="classes" :style="styles">
    <div class="ta-progress_bar">
      <div :class="trackClasses" :style="trackStyles"></div>
    </div>
    <div class="ta-progress_text" v-if="$slots.default || showText">
      <slot :progress="progress">
        {{ showText ? progress : '' }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { colorValidator } from '../helpers'
import {
  getClasses,
  getProgress,
  getStyles,
  getTrackClasses,
  getTrackStyles
} from './util'

export default defineComponent({
  name: 'ta-progress',
  props: {
    percentage: {
      type: [Number, String],
      default: 0
    },
    showText: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: true
    },
    fixedBar: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const progress = computed(() => getProgress(props.percentage))
    const classes = computed(() => getClasses(props.fixedBar))
    const styles = computed(() => getStyles(props.color))
    const trackClasses = computed(() => getTrackClasses(props.animated))
    const trackStyles = computed(() => getTrackStyles(progress.value))

    return {
      progress,
      classes,
      styles,
      trackClasses,
      trackStyles
    }
  }
})
</script>
