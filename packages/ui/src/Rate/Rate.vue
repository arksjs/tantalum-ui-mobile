<template>
  <div :class="classes" :style="styles" ref="root">
    <input
      :name="name"
      type="hidden"
      :value="inputValue"
      :disabled="disabled"
    />
    <div
      class="ak-rate_item"
      :class="{
        active: num - 0.5 <= inputValue,
        half: inputValue - num === -0.5
      }"
      v-for="num in max"
      :key="num"
      :data-value="num"
    >
      <i class="ak-rate_icon">
        <Icon :icon="icon" />
      </i>
      <i class="ak-rate_active-icon">
        <Icon :icon="activeIcon" />
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, shallowRef, watch } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import { isInteger, rangeInteger } from '../helpers/util'
import { colorValidator, iconValidator } from '../helpers/validator'
import { formItemProps, formNumberValueEmits } from '../Form/form'
import { useTouch } from '../hooks/use-touch'
import StarOutlined from '../Icon/icons/StarOutlined'
import StarFilled from '../Icon/icons/StarFilled'
import type { IconData } from '../Icon/types'
import {
  getClasses,
  getStyles,
  isIntegerOrHalf,
  DEFAULT_COUNT,
  getMax
} from './util'
import type { PropsToEmits } from '../helpers/types'
import type { RateEmits } from './types'

interface RateCoords {
  size: number
  offsetX: number
  startX: number
  current: number
  isHalf: boolean
  isChange: boolean
}

export default defineComponent({
  name: 'ak-rate',
  components: { Icon },
  props: {
    ...formItemProps,
    modelValue: {
      type: [Number, String],
      validator: isIntegerOrHalf,
      default: null
    },
    count: {
      type: [Number, String],
      default: DEFAULT_COUNT
    },
    allowHalf: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator,
      default: StarOutlined
    },
    activeIcon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator,
      default: StarFilled
    },
    color: {
      type: String,
      validator: colorValidator
    },
    activeColor: {
      type: String,
      validator: colorValidator
    },
    size: {
      type: [Number, String]
    }
  },
  emits: { ...formNumberValueEmits } as PropsToEmits<RateEmits>,
  setup(props, ctx) {
    const { emit } = ctx
    const root = shallowRef<HTMLElement | null>(null)
    const inputValue = ref(0)

    function change(value: number, isHalf = false) {
      if (props.allowHalf && isHalf) {
        value -= 0.5
      }

      if (value !== inputValue.value) {
        inputValue.value = value

        emit('update:modelValue', value)
        emit('change', value)
      }
    }

    const classes = computed(() => getClasses(props))
    const styles = computed(() => getStyles(props))
    const max = computed(() => getMax(props.count))
    const isReadonly = computed(() => !!(props.disabled || props.readonly))

    let coords: RateCoords | null

    useTouch({
      el: root,
      onTouchStart(e) {
        if (isReadonly.value) {
          return
        }

        const { clientX } = e.touchObject

        let $target = e.target as HTMLElement
        while ($target.tagName !== 'DIV') {
          $target = $target.parentElement as HTMLElement
        }
        const value = parseInt($target.dataset.value as string)
        const rects = $target.getClientRects()[0]

        coords = {
          size: rects.height,
          offsetX: clientX - rects.left,
          startX: clientX,
          current: value,
          isHalf: false,
          isChange: false
        }
        coords.isHalf = coords.offsetX < coords.size / 2

        change(value, coords.isHalf)

        e.preventDefault()
      },
      onTouchMove(e) {
        if (!coords) {
          return
        }

        const { clientX } = e.touchObject
        const { startX, size, offsetX, current } = coords

        const x = clientX - startX

        let offsetCount = 0

        if (x > 0) {
          offsetCount =
            Math.floor(x / size) + (x % size > size - offsetX ? 1 : 0)
        } else if (x < 0) {
          offsetCount = -Math.floor(-x / size) + (-x % size > offsetX ? -1 : 0)
        }

        const isHalf = (offsetX + x) % size < size / 2

        coords.isChange = true

        change(rangeInteger(current + offsetCount, 1, max.value), isHalf)

        e.stopPropagation()
      },
      onTouchEnd(e) {
        if (coords) {
          coords = null
          e.stopPropagation()
        }
      }
    })

    function updateValue() {
      if (!isIntegerOrHalf(props.modelValue)) {
        return
      }

      const value = parseFloat(props.modelValue as string)

      if (value === inputValue.value) {
        return
      }

      if (value < 0 || value > max.value) {
        return
      }

      if (!props.allowHalf && !isInteger(value)) {
        return
      }

      inputValue.value = value
    }

    updateValue()

    watch(() => props.modelValue, updateValue)

    return {
      root,
      inputValue,
      classes,
      styles,
      max
    }
  }
})
</script>
