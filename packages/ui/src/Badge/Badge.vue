<template>
  <div :class="classes">
    <slot></slot>
    <div :class="badgeClasses" :style="badgeStyles" v-if="content != null">
      <slot name="badge" :showCount="showCount">
        {{ showCount }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import {
  getNumber,
  isNumber,
  rangeInteger,
  colorValidator,
  isString
} from '../helpers'
import {
  DEFAULT_MAX_COUNT,
  getBadgeClasses,
  getBadgeStyles,
  getClasses,
  getDefaultContent,
  getShowContent
} from './util'
import { useFrameTask } from '../hooks'

export default defineComponent({
  name: 'ta-badge',
  props: {
    content: {
      type: [Number, String],
      default: 0
    },
    maxCount: {
      type: [Number, String],
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    },
    showZero: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    offset: {
      type: Array as PropType<number[]>,
      default: () => {
        return [0, 0]
      }
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  setup(props) {
    const content2 = ref(getDefaultContent(props))
    const { frameStart, frameStop } = useFrameTask()

    const classes = computed(() => getClasses(props))
    const badgeClasses = computed(() => getBadgeClasses(props))
    const badgeStyles = computed(() => getBadgeStyles(props))
    const showCount = computed(() => getShowContent(props, content2.value))

    watch([() => props.content, () => props.maxCount], ([val, max]) => {
      frameStop()

      if (isString(val)) {
        content2.value = val
        return
      }
      if (!isNumber(val)) {
        return
      }

      const currentIsShow = props.showZero || content2.value > 0
      const isReadyToHide = !props.showZero && val === 0

      if (!currentIsShow || isReadyToHide) {
        content2.value = val
      } else {
        const to = rangeInteger(val, 0, getNumber(max, DEFAULT_MAX_COUNT))

        if (to === content2.value) {
          return
        }

        if (!props.animated) {
          content2.value = to
          return
        }

        frameStart({
          from: content2.value as number,
          to,
          duration: Math.min(
            Math.abs(to - (content2.value as number)) * 50,
            1000
          ),
          progress: ({
            current,
            frameIndex
          }: {
            current: number
            frameIndex: number
          }) => {
            if (frameIndex % 3 === 0) {
              content2.value = Math.round(current)
            }
          },
          complete: ({ current }: { current: number }) => {
            content2.value = current
          }
        })
      }
    })

    return {
      showCount,
      classes,
      badgeClasses,
      badgeStyles
    }
  }
})
</script>
