<template>
  <div class="fx-swipe-cell fx-horizontal-hairline" ref="root">
    <div class="fx-swipe-cell_inner" :style="innerStyles">
      <slot></slot>
      <div class="fx-swipe-cell_buttons" ref="buttonsEl">
        <button
          class="fx-swipe-cell_button"
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
import { ref, defineComponent, computed, reactive } from 'vue'
import type { PropType } from 'vue'
import { cloneData, rangeNumber, noop } from '../helpers/util'
import type { ButtonOption, SwipeCellEmits } from './types'
import { useTouch } from '../hooks/use-touch'
import { getStretchOffset } from '../helpers/animation'
import type { PropsToEmits } from '../helpers/types'
import { getButtons, getInnerStyles, getButtonStyles } from './util'
import { useStop, useBlur } from '../hooks/use-event'

interface SwipeCellCoords {
  startX: number
  buttonsW: number
  isShow: boolean
  isSwipe: boolean
}

export default defineComponent({
  name: 'fx-swipe-cell',
  props: {
    buttons: {
      type: Array as PropType<ButtonOption[]>,
      validator: (items: ButtonOption[]) => {
        return (
          Array.isArray(items) &&
          items.filter(item => {
            return !(item && typeof item.text === 'string')
          }).length === 0
        )
      },
      default: () => [] as ButtonOption[]
    }
  },
  emits: {
    buttonClick: payload => payload && typeof payload.index === 'number'
  } as PropsToEmits<SwipeCellEmits>,
  setup(props, ctx) {
    const root = ref<HTMLElement>()
    const buttonsEl = ref<HTMLElement>()
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

    function hide() {
      if (!isShow) {
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
      hide()
    }

    const buttons2 = computed(() => getButtons(props.buttons))

    useTouch({
      el: root,
      onTouchStart(e) {
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
      onTouchMove(e) {
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
            (($children[i] as HTMLElement).offsetLeft * (buttonsW - max)) /
            buttonsW
        }

        translateX.value =
          max + (x > buttonsW ? getStretchOffset(x - buttonsW) : 0)
        duration.value = 0

        e.stopPropagation()
      },
      onTouchEnd(e) {
        if (coords) {
          const { isSwipe, buttonsW } = coords

          if (isSwipe && translateX.value > buttonsW / 2) {
            // 展示
            show(buttonsW)
          } else {
            hide()
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

    useBlur(hide)
    useStop(buttonsEl, 'click')

    return {
      root,
      buttonsEl,
      buttonTranslateXs,
      buttons2,
      duration,
      noop,
      onButtonClick,
      innerStyles,
      getButtonStyles
    }
  }
})
</script>
