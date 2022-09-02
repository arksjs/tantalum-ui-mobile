import { computed, ref } from 'vue'
import { getNumber, rangeNumber } from '../helpers/util'
import { useTouch } from '../hooks/use-touch'
import {
  addClassName,
  getRelativeOffset,
  removeClassName
} from '../helpers/dom'
import type { SlideCommonProps } from './types'
import { getSlideClasses, getSlideStyles } from './util'

interface Coords {
  prevValue: number // 滑动之前value值
  thumb: boolean // 是否点击了滑块
  thumbW: number // 滑块宽度
  clientStartX: number // 按下初始位置
  thumbXInTrack: number // 按下滑块在滑轨内的初始位置
  trackX: number // 按下滑轨的初始位置
  trackW: number // 滑轨宽度
  moved: boolean // 是否滑动
  $target: HTMLElement // 滑动元素
}

interface UseOptions {
  getValue: ($target: HTMLElement) => number
  move: (args: {
    value: number
    progress: number
    $target: HTMLElement
  }) => void
  end: (args: {
    value: number
    isChange: boolean
    $target: HTMLElement
  }) => void
}

const thumbW = 24

export function useSlide(
  props: SlideCommonProps,
  { move, end, getValue }: UseOptions
) {
  const sliderEl = ref<HTMLElement>()

  let coords: Coords | null
  let tempValue = 0

  function toInteger(number: number | string) {
    return Math.round(number as number)
  }

  function getMinMax() {
    let min = toInteger(getNumber(props.min, 0))
    let max = toInteger(getNumber(props.max, 100))

    if (min > max) {
      // 兼容min max搞反的问题
      max = [min, (min = max)][0]
    }

    return [min, max]
  }

  function value2Progress(val: number) {
    const [min, max] = getMinMax()

    return (val - min) / (max - min)
  }

  function rangeValue(val: number) {
    const [min, max] = getMinMax()

    return rangeNumber(val, min, max)
  }

  function updateByX(x: number, { trackW, prevValue, $target }: Coords) {
    x = rangeNumber(x, 0, trackW)

    const [min, max] = getMinMax()
    const step = toInteger(getNumber(props.step, 1))

    let newVal = toInteger(((max - min) * x) / trackW + min)
    newVal = toInteger((newVal - prevValue) / step) * step + prevValue
    newVal = rangeNumber(newVal, min, max)

    tempValue = newVal

    move({ value: tempValue, progress: value2Progress(newVal), $target })
  }

  useTouch({
    el: sliderEl,
    onTouchStart(e) {
      if (props.disabled) {
        // 禁用
        return
      }

      const { clientX } = e.touchObject

      const $target = e.target as HTMLElement
      const trackRects = (sliderEl.value as HTMLElement).getClientRects()[0]
      const thumb = !!$target.dataset.thumb

      coords = {
        prevValue: getValue($target),
        thumb,
        thumbW,
        clientStartX: clientX,
        thumbXInTrack: getRelativeOffset($target, sliderEl.value).offsetLeft,
        trackX: trackRects.left,
        trackW: trackRects.width - thumbW,
        moved: false,
        $target
      }

      if (thumb) {
        addClassName($target, 'active')
      }

      tempValue = coords.prevValue

      e.preventDefault()
    },

    onTouchMove(e) {
      if (!coords) {
        return
      }

      coords.moved = true

      if (!coords.thumb) {
        return
      }

      const { clientX } = e.touchObject
      const { clientStartX, thumbXInTrack } = coords

      updateByX(thumbXInTrack + clientX - clientStartX, coords)

      e.stopPropagation()
    },

    onTouchEnd(e) {
      if (coords) {
        if (!coords.thumb && !coords.moved) {
          updateByX(
            coords.clientStartX - coords.trackX - coords.thumbW / 2,
            coords
          )
        }

        if (coords.thumb) {
          removeClassName(coords.$target, 'active')
        }

        end({
          value: tempValue,
          isChange: coords.prevValue !== tempValue,
          $target: coords.$target
        })

        coords = null
        e.stopPropagation()
      }
    }
  })

  const slideClasses = computed(() => getSlideClasses(props.disabled))
  const slideStyles = computed(() => getSlideStyles(props.color))

  return {
    sliderEl,
    toInteger,
    rangeValue,
    value2Progress,
    getMinMax,
    slideClasses,
    slideStyles
  }
}
