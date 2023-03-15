<template>
  <div
    :class="classes"
    ref="root"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @mousedown="onTouchStart"
    @mousemove="onTouchMove"
    @mouseup="onTouchEnd"
    @mouseleave="onTouchEnd"
    @dragstart="onDragStart"
  >
    <div class="ta-swiper_list" ref="listEl">
      <SwiperItems @resetItems="resetItems"><slot></slot></SwiperItems>
    </div>
    <div :class="indicatorsClasses" v-if="indicatorDots">
      <span
        v-for="item in pagination"
        :key="item"
        class="ta-swiper_indicator"
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
      <button class="ta-swiper_prev" @click="prev">
        <Icon :icon="LeftOutlined" />
      </button>
      <button class="ta-swiper_next" @click="next">
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
  shallowRef
} from 'vue'
import { Icon } from '../Icon'
import {
  isNumber,
  returnTrue,
  getStretchOffset,
  CSSProperties2CssText,
  colorValidator,
  type PropsToEmits,
  getNumber,
  isSameArray,
  getElementItems
} from '../helpers'
import { useTouch, useResizeObserver, useException, useOnce } from '../hooks'
import SwiperItems from './SwiperItems.vue'
import { emitChangeValidator } from './props'
import LeftOutlined from '../Icon/icons/LeftOutlined'
import RightOutlined from '../Icon/icons/RightOutlined'
import {
  getClasses,
  getIndicatorsClasses,
  getPaginationItemClasses,
  getPaginationItemStyles
} from './util'
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
  name: 'ta-swiper',
  components: { Icon, SwiperItems },
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
      type: [Number, String],
      default: 5000
    },
    duration: {
      type: [Number, String]
    },
    initialCircular: {
      type: Boolean,
      default: false
    },
    activeIndex: {
      type: [Number, String],
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
    activeIndexChange: emitChangeValidator,
    animated: emitChangeValidator,
    click: returnTrue,
    resetItems: (items: HTMLElement[]) => Array.isArray(items)
  } as PropsToEmits<SwiperEmits>,
  setup(props, { emit, expose }) {
    const { printListItemNotFoundError } = useException()
    const root = shallowRef<HTMLElement | null>(null)
    const listEl = shallowRef<HTMLElement | null>(null)
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
    let isEmitChange = true

    /**
     * 切换到
     * @param activeIndex 索引
     */
    function _swipeTo(activeIndex: number, isProp = false) {
      const len = $items.length

      if (len === 0) {
        goTo(0)
      } else if (
        isNumber(activeIndex) &&
        activeIndex >= 0 &&
        activeIndex < len
      ) {
        if (activeIndex !== index.value) {
          // 通过props设置的activeIndex不emit change
          isEmitChange = !isProp
          goTo(activeIndex, false)
          isEmitChange = true
        }
      } else {
        printListItemNotFoundError('activeIndex', isProp)
      }
    }

    /**
     * 跳转到上一项
     */
    function prev() {
      goTo(getCircleIndex(-1))
    }
    /**
     * 跳转到下一项
     */
    function next() {
      goTo(getCircleIndex(1))
    }
    /**
     * 获取循环的索引
     */
    function getCircleIndex(step: number) {
      const len = $items.length
      return len === 0 ? 0 : (index.value + len + (step % len)) % len
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
      if (toIndex !== fromIndex && isEmitChange) {
        // 排重
        emit('update:activeIndex', toIndex)
        emit('activeIndexChange', toIndex, fromIndex)
      }

      index.value = toIndex
    }

    function onSlide(toIndex: number, fromIndex: number) {
      emit('animated', toIndex, fromIndex)
    }

    /**
     *  到指定项
     */
    function goTo(toIndex: number, animated = true) {
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

      let duration = 0

      if (props.duration == null) {
        duration = Math.abs(transSizeOffset)
        duration = Math.max(100, Math.min(800, duration))
      } else {
        duration = getNumber(props.duration)
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

    function resetItems() {
      const $newItems = getElementItems(listEl.value, 'ta-swiper-item')

      if (isSameArray($newItems, $items)) {
        return
      }
      $items = $newItems
      emit('resetItems', $newItems)

      // 处理索引和页码
      pagination.value = $items.map((_, index) => index)

      setSlideStyle()

      const last = getLastIndex()

      if (index.value > last) {
        _swipeTo(last)
      }

      start()
    }

    const styleOnce = useOnce(50)

    /**
     * 设置滑动样式属性
     */
    function setSlideStyle() {
      styleOnce(() => {
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

        const itemCssText = `${
          direction === 'x' ? 'float: left; ' : ''
        }${sizeName.toLowerCase()}: ${itemSize}px;`

        $items.forEach($item => {
          $item.style.cssText = itemCssText
        })
      })
    }

    let autoplayTimer: number

    /**
     * 开始幻灯片
     */
    function start() {
      stop()
      props.autoplay &&
        $items.length > 1 &&
        (autoplayTimer = window.setInterval(
          () => next(),
          getNumber(props.interval)
        ))
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

    useResizeObserver(root, setSlideStyle)

    let coords: SwiperCoords | null

    const { onTouchStart, onTouchMove, onTouchEnd, onDragStart } = useTouch({
      // 滑动开始事件-记录坐标
      onStart(e) {
        if (playing) {
          return
        }

        // 清除幻灯片
        stop()

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
      // 滑动过程事件-判断横竖向，跟随滑动
      onMove(e) {
        if (!coords || horizontal === false) {
          // 确定非水平移动，就不需要计算数据了
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
          // 首次move确认是否水平移动
          if (absX > absY) {
            horizontal = true
            if (offsetX !== 0) {
              e.preventDefault()
            }
          } else {
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
      // 滑动结束事件-滑到指定位置，重置状态
      onEnd(e) {
        if (!horizontal) {
          // 未确定或者非水平移动情况，返回click事件
          emit('click')
        } else if (coords) {
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

            goTo(transIndex)
          }

          coords = null
        }

        start()
      }
    })

    watch([() => props.autoplay, () => props.interval], () => {
      start()
    })

    watch(
      () => props.activeIndex,
      val => _swipeTo(getNumber(val), true)
    )

    onMounted(() => {
      resetItems()

      const activeIndex = props.activeIndex
      if (activeIndex != null && activeIndex !== 0) {
        _swipeTo(getNumber(activeIndex), true)
      }
    })

    onBeforeUnmount(() => {
      clearTimeout(durationTimer)
      stop()
      $items = []
    })

    const swipeTo = (newIndex: number) => _swipeTo(newIndex, false)

    expose({
      swipeTo,
      prev,
      next
    })

    return {
      root,
      listEl,
      resetItems,
      index,
      pagination,
      getItemEl,
      LeftOutlined,
      RightOutlined,
      classes,
      indicatorsClasses,
      getPaginationItemClasses,
      getPaginationItemStyles,

      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart,

      swipeTo,
      prev,
      next
    }
  }
})
</script>
