<template>
  <div :class="classes" @click="onClick" ref="root">
    <div class="fx-swiper_list" ref="listEl">
      <slot></slot>
    </div>
    <div :class="indicatorsClasses" v-if="indicatorDots">
      <span
        v-for="item in pagination"
        :key="item"
        class="fx-swiper_indicator"
        :class="getPaginationItemClasses(item, index)"
        :style="
          getPaginationItemStyles(
            { indicatorActiveColor, indicatorColor },
            item,
            index
          )
        "
      ></span>
    </div>
    <template v-if="navigationButtons && pagination.length > 1">
      <button class="fx-swiper_prev" @click="prev(true)">
        <Icon :icon="LeftOutlined" />
      </button>
      <button class="fx-swiper_next" @click="next(true)">
        <Icon :icon="RightOutlined" /></button
    ></template>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  onMounted,
  watch,
  onBeforeUnmount,
  provide
} from 'vue'
import { Icon } from '../Icon'
import Exception from '../helpers/exception'
import { isNumber } from '../helpers/util'
import { useList } from '../hooks/use-list'
import { getStretchOffset } from '../helpers/animation'
import { useTouch } from '../hooks/use-touch'
import { CSSProperties2CssText } from '../helpers/dom'
import { emitChangeValidator } from './props'
import { colorValidator, emitEventValidator } from '../helpers/validator'
import LeftOutlined from '../Icon/icons/LeftOutlined'
import RightOutlined from '../Icon/icons/RightOutlined'
import { useResizeObserver } from '../hooks/use-resize-observer'
import {
  getClasses,
  getIndicatorsClasses,
  getPaginationItemClasses,
  getPaginationItemStyles
} from './util'
import type { PropsToEmits } from '../helpers/types'
import type { SwiperEmits } from './types'

interface SwiperCoords {
  offset: boolean | null
  startX: number
  startY: number
  stopX: number
  stopY: number
  timeStamp: number
}

export default defineComponent({
  name: 'fx-swiper',
  components: { Icon },
  props: {
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      default: false
    },
    indicatorColor: {
      type: String,
      validator: colorValidator
    },
    indicatorActiveColor: {
      type: String,
      validator: colorValidator
    },
    navigationButtons: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 5000
    },
    duration: {
      type: Number,
      default: null
    },
    initialCircular: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    initialVertical: {
      type: Boolean,
      default: false
    },
    // 边界弹性控制
    bounces: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:activeIndex': activeIndex => isNumber(activeIndex),
    change: emitChangeValidator,
    animated: emitChangeValidator,
    click: emitEventValidator
  } as PropsToEmits<SwiperEmits>,
  setup(props, ctx) {
    const root = ref<HTMLElement>()
    const { emit } = ctx
    const index = ref(0)
    const pagination = ref<number[]>([])

    const direction = props.initialVertical ? 'y' : 'x'
    const directionGroup = props.initialVertical
      ? ['Y', 'X', 'Height', 'Width']
      : ['X', 'Y', 'Width', 'Height']
    const circular = !!props.initialCircular
    const classes = getClasses(direction)
    const indicatorsClasses = getIndicatorsClasses(direction)

    let prevTranSize = 0
    let $items: HTMLElement[] = []
    let itemSize = 0
    let horizontal: boolean | null = null

    /**
     * 切换到
     * @param activeIndex 索引
     */
    function swipeTo(activeIndex: number) {
      if (
        isNumber(activeIndex) &&
        activeIndex >= 0 &&
        activeIndex < $items.length
      ) {
        if (activeIndex !== index.value) {
          to(activeIndex, false)
        }
      } else {
        console.error(
          new Exception(
            'This value of "activeIndex" is out of range.',
            Exception.TYPE.PROP_ERROR,
            'Swiper'
          )
        )
      }
    }

    /**
     * 跳转到上一项
     */
    function prev(useCircular = false) {
      to(useCircular ? getCircleIndex(-1) : index.value - 1)
    }
    /**
     * 跳转到下一项
     */
    function next(useCircular = false) {
      to(useCircular ? getCircleIndex(1) : index.value + 1)
    }

    /**
     * 获取循环的索引
     */
    function getCircleIndex(step: number) {
      const length = $items.length
      return (index.value + length + (step % length)) % length
    }

    function updateSwipeLoop(offset?: number) {
      if (!circular) {
        return
      }

      const slideIndex = index.value
      const lastIndex = getLastIndex()
      const itemCount = lastIndex + 1

      $items.forEach(($item, index) => {
        if (offset != null && offset < 0) {
          if (slideIndex === 0 && index === lastIndex) {
            $item.style.transform = getTransformStyleValue(
              -itemSize * itemCount
            )
          } else {
            $item.style.transform = ''
          }
        } else if (offset != null && offset > 0) {
          if (slideIndex === lastIndex && index === 0) {
            $item.style.transform = getTransformStyleValue(itemSize * itemCount)
          } else {
            $item.style.transform = ''
          }
        } else {
          if (slideIndex === 0 && index === lastIndex) {
            $item.style.transform = getTransformStyleValue(
              -itemSize * itemCount
            )
          } else if (slideIndex === lastIndex && index === 0) {
            $item.style.transform = getTransformStyleValue(itemSize * itemCount)
          } else {
            $item.style.transform = ''
          }
        }
      })

      if (offset == null) {
        updateListStyle(-itemSize * slideIndex)
      }
    }

    function getLastIndex() {
      return $items.length - 1
    }

    /**
     * 获取滑动距离值
     */
    function getTransformStyleValue(size: number) {
      return (
        'translate3d(' +
        (direction === 'x'
          ? size + 'px, 0px, 0px'
          : '0px, ' + size + 'px, 0px') +
        ')'
      )
    }

    function updateListStyle(transSize: number, duration = 0) {
      const listStyle = (listEl.value as HTMLElement).style

      listStyle.transitionDuration = duration + 'ms'
      listStyle.transform = getTransformStyleValue(transSize)
      prevTranSize = transSize
    }

    function onBeforeSlide(toIndex: number, fromIndex: number) {
      if (toIndex !== fromIndex) {
        // 排重
        emit('update:activeIndex', toIndex)
        emit('change', toIndex, fromIndex)
      }

      index.value = toIndex
    }

    function onSlide(toIndex: number, fromIndex: number) {
      emit('animated', toIndex, fromIndex)
    }

    function onClick(e: MouseEvent) {
      if (!horizontal) {
        emit('click', e)
      }
    }

    /**
     *  到指定项
     */
    function to(toIndex: number, animated = true) {
      const lastIndex = getLastIndex()
      let slideIndex = toIndex

      if (lastIndex < 0) {
        return
      }

      if (toIndex >= 0 && toIndex <= lastIndex && toIndex != index.value) {
        slide(toIndex, slideIndex, animated)
      } else {
        if (circular) {
          if (toIndex < 0) {
            slideIndex = -1
            toIndex = lastIndex
          } else if (toIndex > lastIndex) {
            slideIndex = lastIndex + 1
            toIndex = 0
          }
        } else {
          toIndex = index.value
        }

        slide(toIndex, slideIndex, animated)
      }
    }

    let playing = false
    let durationTimer: number

    /**
     * 滑动实现
     */
    function slide(toIndex: number, slideIndex: number, animated = true) {
      if (itemSize === 0 || playing) {
        return
      }

      if (!circular) {
        slideIndex = toIndex
      }

      playing = true

      const fromIndex = index.value
      const transSize = -itemSize * slideIndex
      const transSizeOffset = prevTranSize - transSize

      if (fromIndex !== slideIndex) {
        updateSwipeLoop(transSizeOffset)
      }

      onBeforeSlide(toIndex, fromIndex)

      // if (toIndex !== fromIndex) {
      //   onChange(toIndex, fromIndex)
      // }

      let duration = props.duration

      if (duration == null) {
        duration = Math.abs(transSizeOffset)
        duration = Math.max(100, Math.min(800, duration))
      }

      if (animated === false) {
        duration = 0
      }

      updateListStyle(transSize, duration)

      clearTimeout(durationTimer)
      durationTimer = window.setTimeout(() => {
        updateListStyle(transSize, 0)

        animateDone(transSize, toIndex, fromIndex, 0)
      }, duration)
    }

    function animateDone(
      transSize: number,
      toIndex: number,
      fromIndex: number,
      frameNumber: number
    ) {
      durationTimer = requestAnimationFrame(() => {
        const transform = window.getComputedStyle(
          listEl.value as HTMLElement
        ).transform

        const currentSize = transform
          .slice(7, transform.length - 1)
          .split(', ')[direction === 'y' ? 5 : 4]

        if (
          parseFloat(currentSize).toFixed(2) === transSize.toFixed(2) ||
          frameNumber > 0
        ) {
          // 校对清楚再回调
          playing = false

          // 滑动回调
          onSlide(toIndex, fromIndex)

          updateSwipeLoop()
        } else {
          animateDone(transSize, toIndex, fromIndex, ++frameNumber)
        }
      })
    }

    let isFirst = true

    function resetItems(res: HTMLElement[]) {
      $items = res
      setSlideStyle()

      const last = getLastIndex()

      if (isFirst) {
        isFirst = false

        if (props.activeIndex !== 0) {
          swipeTo(props.activeIndex)
        }
      } else if (index.value > last) {
        to(last)
      }
    }

    /**
     * 设置滑动样式属性
     */
    function setSlideStyle() {
      if (!root.value || !listEl.value) {
        return
      }

      const sizeName = directionGroup[2]
      const _itemSize = root.value[('client' + sizeName) as 'clientWidth']
      if (_itemSize === 0) {
        return
      }
      itemSize = _itemSize

      root.value.style[('overflow' + directionGroup[0]) as 'overflowY'] =
        'hidden'

      listEl.value.style.cssText = CSSProperties2CssText({
        WebkitBackfaceVisibility: 'hidden',
        WebkitPerspective: 1000,
        [sizeName.toLowerCase()]: itemSize * $items.length + 'px',
        transition: 'transform 0ms ease-out'
      })

      updateListStyle(-itemSize * index.value)

      pagination.value = []

      $items.forEach(($item, i) => {
        $item.dataset.index = i.toString()

        let cssText = `${sizeName.toLowerCase()}: ${itemSize}px;`

        if (direction === 'x') {
          // 左右滑动
          cssText += 'float: left;'
        }

        $item.style.cssText = cssText

        pagination.value.push(i)
      })
    }

    let autoplayTimer: number

    /**
     * 开始幻灯片
     */
    function start() {
      stop()
      props.autoplay &&
        (autoplayTimer = window.setInterval(() => {
          to(getCircleIndex(1))
        }, props.interval))
    }

    /**
     * 结束幻灯片
     */
    function stop() {
      clearTimeout(autoplayTimer)
    }

    function getItemEl(index: number) {
      return $items[index] || null
    }

    const { listEl, update } = useList('swiper', resetItems)

    useResizeObserver(root, () => update(50))

    let coords: SwiperCoords | null
    let inMove = false

    useTouch({
      el: root,
      // 滑动开始事件-记录坐标
      onTouchStart(e) {
        // 禁止图片拖拽
        if (e.target.tagName === 'IMG') {
          e.target.ondragstart = function () {
            return false
          }
        }
        // e.preventDefault()
        if (playing) {
          return
        }

        // 清除幻灯片
        stop()

        inMove = true
        horizontal = null
        // 记录坐标

        coords = {
          startX: e.touchObject.pageX,
          startY: e.touchObject.pageY,
          stopX: e.touchObject.pageX,
          stopY: e.touchObject.pageY,
          timeStamp: e.timeStamp,
          offset: null
        }
      },
      /**
       * 滑动过程事件-判断横竖向，跟随滑动
       */
      onTouchMove(e) {
        if (!inMove || !coords) {
          return
        }

        coords.stopX = e.touchObject.pageX
        coords.stopY = e.touchObject.pageY

        let offsetX = coords.startX - coords.stopX
        let offsetY = coords.startY - coords.stopY

        if (direction === 'y') {
          // 垂直
          offsetX = [offsetY, (offsetY = offsetX)][0]
        }

        const absX = Math.abs(offsetX)
        const absY = Math.abs(offsetY)

        if (horizontal === null) {
          // 首次
          if (offsetX !== 0) {
            // bug hack
            e.preventDefault()
          }
        } else {
          // 首次move确认是否水平移动
          if (absX > absY) {
            horizontal = true
            if (offsetX !== 0) {
              e.preventDefault()
            }
          } else {
            coords = null
            horizontal = false
            return
          }
        }

        const active = index.value
        let transSize = active * itemSize

        if (
          !circular &&
          ((active === 0 && offsetX < 0) ||
            (active === getLastIndex() && offsetX > 0))
        ) {
          transSize += props.bounces ? getStretchOffset(offsetX) : 0
        } else {
          transSize += offsetX
        }

        if (absX < itemSize) {
          if (coords.offset == null || offsetX > 0 !== coords.offset) {
            updateSwipeLoop(offsetX)
            coords.offset = offsetX > 0
          }

          updateListStyle(-transSize)
        }
      },
      /**
       * 滑动结束事件-滑到指定位置，重置状态
       */
      onTouchEnd(e) {
        if (!inMove) {
          return
        }

        inMove = false

        if (coords) {
          const offsetX =
            direction === 'x'
              ? coords.startX - coords.stopX
              : coords.startY - coords.stopY
          let absX = Math.abs(offsetX)
          const active = index.value

          let transIndex

          if (!isNaN(absX) && absX !== 0) {
            if (absX > itemSize) {
              absX = itemSize
            }
            if (absX >= 80 || e.timeStamp - coords.timeStamp < 200) {
              if (offsetX > 0) {
                transIndex = active + 1
              } else {
                transIndex = active - 1
              }
            } else {
              transIndex = active
            }

            to(transIndex)
            coords = null
          }
        }

        start()
      }
    })

    watch(
      () => props.activeIndex,
      val => swipeTo(val)
    )

    watch([() => props.autoplay, () => props.interval], () => {
      start()
    })

    onMounted(() => {
      start()
    })

    onBeforeUnmount(() => {
      clearTimeout(durationTimer)
      stop()
      $items = []
    })

    provide('disableFixed', true)

    return {
      root,
      listEl,
      swipeTo,
      prev,
      next,
      onClick,
      index,
      pagination,
      update,
      getItemEl,
      LeftOutlined,
      RightOutlined,
      classes,
      indicatorsClasses,
      getPaginationItemClasses,
      getPaginationItemStyles
    }
  }
})
</script>