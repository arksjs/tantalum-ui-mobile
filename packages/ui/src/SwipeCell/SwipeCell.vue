<template>
  <div
    class="ta-swipe-cell ta-horizontal-hairline"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mousemove="onTouchMove"
    @mouseup="onTouchEnd"
    @mouseleave="onTouchEnd"
    @dragstart="onDragStart"
  >
    <div class="ta-swipe-cell_inner" :style="innerStyles">
      <slot></slot>
      <div class="ta-swipe-cell_buttons" ref="buttonsEl">
        <button
          class="ta-swipe-cell_button"
          :class="['type--' + item.type]"
          v-for="(item, index) in buttons2"
          :key="index"
          :style="
            getButtonStyles({
              buttonTranslateXs,
              duration,
              index
            })
          "
          @click="onButtonClick(item, index)"
        >
          {{ item.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, reactive, shallowRef, type PropType } from 'vue'
import {
  cloneData,
  rangeNumber,
  noop,
  getStretchOffset,
  type PropsToEmits,
  isString,
  isNumber
} from '../helpers'
import type { ButtonOption, SwipeCellEmits } from './types'
import { useTouch, useStop, useDocumentBlur } from '../hooks'
import { getButtons, getInnerStyles, getButtonStyles } from './util'

interface SwipeCellCoords {
  startX: number
  buttonsW: number
  isShow: boolean
  isSwipe: boolean
}

export default defineComponent({
  name: 'ta-swipe-cell',
  props: {
    buttons: {
      type: Array as PropType<ButtonOption[]>,
      validator: (items: ButtonOption[]) => {
        return (
          Array.isArray(items) &&
          items.filter(item => {
            return !(item && isString(item.text))
          }).length === 0
        )
      },
      default: () => [] as ButtonOption[]
    }
  },
  emits: {
    buttonClick: payload => payload && isNumber(payload.index)
  } as PropsToEmits<SwipeCellEmits>,
  setup(props, ctx) {
    const buttonsEl = shallowRef<HTMLElement | null>(null)
    const translateX = ref(0)
    const duration = ref(0)
    const buttonTranslateXs = reactive<number[]>([])
    let coords: SwipeCellCoords | null
    let isShow = false

    function show(x: number) {
      translateX.value = x
      duration.value = 0.6

      buttonTranslateXs.forEach((v, k) => {
        buttonTranslateXs[k] = 0
      })

      isShow = true
    }

    function hide(focus: boolean, source: string) {
      // console.log(isShow, focus, source)
      if (!isShow && !focus) {
        return
      }

      isShow = false

      translateX.value = 0
      duration.value = 0.6

      buttonTranslateXs.forEach((v, k) => {
        buttonTranslateXs[k] = 0
      })
    }

    function onButtonClick(item: Required<ButtonOption>, index: number) {
      ctx.emit('buttonClick', {
        item: cloneData(item),
        index
      })
      hide(false, 'buttonClick')
    }

    const buttons2 = computed(() => getButtons(props.buttons))

    const { onTouchStart, onTouchMove, onTouchEnd, onDragStart } = useTouch({
      onStart(e) {
        if (props.buttons.length === 0) {
          return
        }

        coords = {
          startX: e.touchObject.clientX,
          buttonsW: (buttonsEl.value as HTMLElement).clientWidth,
          isShow: translateX.value > 0,
          isSwipe: false
        }

        if (coords.isShow) {
          e.stopPropagation()
        }
      },
      onMove(e) {
        if (!coords) {
          return
        }

        const { startX, buttonsW, isSwipe, isShow } = coords

        let x = startX - e.touchObject.clientX

        if (!isShow && !isSwipe && x < 0) {
          coords = null
          return
        }
        coords.isSwipe = true

        if (isShow) {
          x += buttonsW
        }

        const max = rangeNumber(x, 0, buttonsW)

        const $children = (buttonsEl.value as HTMLElement).children

        for (let i = 0, len = $children.length; i < len; i++) {
          buttonTranslateXs[i] =
            (($children[i] as HTMLElement).offsetLeft * (buttonsW - max)) / buttonsW
        }

        translateX.value = max + (x > buttonsW ? getStretchOffset(x - buttonsW) : 0)
        duration.value = 0

        e.stopPropagation()
      },
      onEnd(e) {
        if (coords) {
          const { isSwipe, buttonsW } = coords

          if (isSwipe && translateX.value > buttonsW / 2) {
            // 展示
            show(buttonsW)
          } else {
            // 画出来不够，要强制收回去
            hide(true, 'touch')
          }

          coords = null
          e.stopPropagation()
        }
      }
    })

    const innerStyles = computed(() =>
      getInnerStyles({
        translateX: translateX.value,
        duration: duration.value
      })
    )

    useDocumentBlur(() => hide(false, 'blur'))
    useStop(buttonsEl, 'click')

    return {
      buttonsEl,
      buttonTranslateXs,
      buttons2,
      duration,
      noop,
      onButtonClick,
      innerStyles,
      getButtonStyles,

      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart
    }
  }
})
</script>
