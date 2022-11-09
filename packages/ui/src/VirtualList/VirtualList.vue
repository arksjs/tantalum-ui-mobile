<template>
  <div :class="classes" ref="root">
    <ul class="ta-virtual-list_list" :style="listStyles" ref="listEl">
      <li
        class="ta-virtual-list_item"
        v-for="item in renderList"
        :key="item.id"
        :data-index="item.index"
        :style="item.style"
      >
        <slot :id="item.id" :index="item.index"></slot>
      </li>
    </ul>
    <ul class="ta-virtual-list_list pool" ref="poolEl">
      <li
        class="ta-virtual-list_item"
        v-for="item in poolList"
        :key="item.id"
        :data-index="item.index"
      >
        <slot :id="item.id" :index="item.index"></slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  nextTick,
  watch,
  shallowRef
} from 'vue'
import { cloneData, isNumber, rangeInteger, rangeNumber } from '../helpers/util'
import { getViewPosition } from '../helpers/dom'
import type { ViewPosition, UniqueID, PropsToEmits } from '../helpers/types'
import type {
  OnVisibleItemsChangePayload,
  ListItem,
  RenderItem,
  ScrollToEnd,
  ScrollTo,
  ScrollToIndex,
  VirtualListEmits
} from './types'
import { useScroll, useScrollTo } from '../hooks/use-scroll'
import { emitVisibleItemsChangeValidator, virtualListProps } from './props'
import { useResizeObserver } from '../hooks/use-resize-observer'
import type { ScrollToOffsetOptions } from '../hooks/types'
import { getClasses, getItemStyles, getListStyles } from './util'
import { useException } from '../hooks/use-exception'

export default defineComponent({
  name: 'ta-virtual-list',
  props: {
    ...virtualListProps
  },
  emits: {
    visibleItemsChange: emitVisibleItemsChangeValidator,
    resize: size => isNumber(size)
  } as PropsToEmits<VirtualListEmits>,
  setup(props, { emit }) {
    const { printPropError } = useException()
    const cols = ref<number[]>([])
    const list = ref<ListItem[]>([])
    const renderList = ref<RenderItem[]>([])
    const root = shallowRef<HTMLElement | null>(null)
    const listEl = shallowRef<HTMLElement | null>(null)
    const poolEl = shallowRef<HTMLElement | null>(null)
    const scrollEl = shallowRef<HTMLElement | null>(null)

    const wrapperSize = ref(0)
    let horizontal = false

    if (props.initialWaterfallCount > 1) {
      for (
        let i = 0, len = rangeInteger(props.initialWaterfallCount, 2, 5);
        i < len;
        i++
      ) {
        cols.value.push(0)
      }
    } else {
      cols.value.push(0)
      if (props.initialHorizontal) {
        horizontal = true
      }
    }

    function getFixedSize(index: number) {
      if (typeof props.itemSize === 'function') {
        try {
          const size = props.itemSize(index)

          if (isNumber(size)) {
            return size
          } else {
            throw new Error()
          }
        } catch (error) {
          printPropError(
            `The "itemSize" function return value should be a Number type.`
          )
        }
      } else if (isNumber(props.itemSize)) {
        return props.itemSize
      }

      return -1
    }

    function dataToList(_ids: UniqueID[]) {
      const newList: ListItem[] = []

      let isChange = _ids.length !== list.value.length

      _ids.forEach((id, index) => {
        const oldItem = list.value[index]
        // 如果没有固定高度（或宽度），默认不回收，因为需要展示以获取当前高度
        let newItem: ListItem = {
          id,
          index,
          size: -1
        }

        if (oldItem && newItem.id === oldItem.id) {
          newItem = oldItem
        } else {
          newItem.size = getFixedSize(newItem.index)
          isChange = true
        }

        newList.push(newItem)
      })
      list.value = newList

      if (isChange) {
        resetCalc()
        nextTick(() => {
          updateItemsSize()
          updateItems('dataChange')
        })
      } else {
        updateItems('dataChange')
      }
    }

    function getElSize($el: HTMLElement | null) {
      return $el ? $el[horizontal ? 'offsetWidth' : 'offsetHeight'] : 0
    }

    function getScrollSize() {
      return scrollEl.value
        ? scrollEl.value[horizontal ? 'scrollLeft' : 'scrollTop']
        : 0
    }

    // 是否计算完列表
    let isCalcEnd = false
    // 对数据进行分割，以50个为一组
    const calcGroupCount = 50
    let calcGroups: {
      index: number
      offset: number
      cols: number[]
    }[] = []
    /**
     * 重置计算列表位置结果
     */
    function resetCalc() {
      isCalcEnd = false
      calcGroups = [
        {
          index: 0,
          offset: 0,
          cols: cols.value.map(() => 0)
        }
      ]
    }
    resetCalc()

    /**
     * 二分算法计算起最近的index
     * @param num 定位值
     * @param key 比较的key
     */
    function getNearsetIndex(num: number, key: 'index' | 'offset' = 'offset') {
      let index = -1
      let left = 0
      let right = calcGroups.length - 1

      while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2)

        if (calcGroups[mid][key] > num) {
          right = mid - 1
          if (calcGroups[right][key] <= num) {
            index = right
            break
          }
        } else if (calcGroups[mid][key] < num) {
          left = mid + 1
          if (!calcGroups[left] || calcGroups[left][key] >= num) {
            index = mid
            break
          }
        } else {
          index = mid
          break
        }
      }

      return index
    }

    function getStartCols(scrollSize: number) {
      // 先利用二分法获取所在分割区间
      let index = getNearsetIndex(scrollSize)

      // 获取最近一个不在渲染范围分割点作为起始计算点
      if (index === -1) {
        return calcGroups[0]
      } else {
        while (
          index !== 0 &&
          !isRecycled(calcGroups[index].offset, scrollSize)
        ) {
          index--
        }
        return calcGroups[index]
      }
    }

    // 缓存可见列表
    let visibleIndexList: number[] = []

    /**
     * 重新计算列表元素
     * @param source 调用来源
     */
    function updateItems(source?: string) {
      const scrollSize = getScrollSize()
      const approvedItemVisibleScale = rangeNumber(
        props.approvedItemVisibleScale,
        0,
        1
      )

      const newList: RenderItem[] = []
      const newVisibleIndexList: number[] = []

      const startCols = getStartCols(scrollSize)
      let renderEntered = false // 是否已经进入渲染列表的计算
      const newCols = cloneData(startCols.cols)

      for (let i = startCols.index, len = list.value.length; i < len; i++) {
        const item = list.value[i]
        const itemSize = item.size

        if (itemSize === -1) {
          return
        }

        let offset = 0
        let colMinIndex = 0
        if (newCols.length > 1) {
          // 瀑布流
          offset = Math.min(...newCols)
          colMinIndex = newCols.indexOf(offset)
        } else {
          colMinIndex = 0
          offset = newCols[colMinIndex]
        }

        if (!isRecycled(offset, scrollSize)) {
          newList.push({
            id: item.id,
            index: item.index,
            style: getItemStyles(
              {
                offset,
                otherOffset: `${colMinIndex * 100}%`,
                itemSize,
                otherSizePx:
                  newCols.length > 1 ? `calc(100% / ${newCols.length})` : '100%'
              },
              cols.value,
              horizontal
            ),
            size: itemSize
          })

          if (
            isVisible(offset, itemSize, scrollSize, approvedItemVisibleScale)
          ) {
            newVisibleIndexList.push(item.index)
          }

          renderEntered = true
        } else {
          if (renderEntered && isCalcEnd) {
            break
          }
        }

        if (!isCalcEnd) {
          if (i !== 0 && i % calcGroupCount === 0) {
            // 存储分割点
            calcGroups.push({
              index: i,
              offset,
              cols: cloneData(newCols)
            })
          }
        }

        newCols[colMinIndex] += itemSize
      }

      if (!isCalcEnd) {
        cols.value = newCols
        isCalcEnd = true
      }

      renderList.value = newList

      // items change
      const payload: OnVisibleItemsChangePayload = {
        items: []
      }
      newVisibleIndexList.forEach(index => {
        if (!visibleIndexList.includes(index)) {
          payload.items.push({
            index,
            visible: true
          })
        }
      })
      visibleIndexList.forEach(index => {
        if (!newVisibleIndexList.includes(index)) {
          payload.items.push({
            index,
            visible: false
          })
        }
      })
      visibleIndexList = newVisibleIndexList

      if (payload.items.length > 0) {
        payload.items.sort((a, b) => a.index - b.index)

        emit('visibleItemsChange', payload)
      }
    }

    function isRecycled(offset: number, scrollSize: number) {
      return !(
        offset >= scrollSize - wrapperSize.value * props.preLoad &&
        offset <= scrollSize + wrapperSize.value * (props.preLoad + 1)
      )
    }

    function isVisible(
      offset: number,
      itemSize: number,
      scrollSize: number,
      approvedItemVisibleScale: number
    ) {
      return (
        scrollSize <= offset + itemSize - itemSize * approvedItemVisibleScale &&
        scrollSize >=
          offset - wrapperSize.value + itemSize * approvedItemVisibleScale
      )
    }

    /**
     * 更新未固定高度的item
     */
    function updateItemsSize() {
      if (poolEl.value) {
        const $items = poolEl.value.children

        if ($items.length > 0) {
          const newList = list.value

          for (let i = 0; i < $items.length; i++) {
            const $item = $items[i] as HTMLElement
            const index = parseInt($item.dataset.index as string)

            newList[index].size = getElSize($item)
          }

          list.value = newList
        }
      }
    }

    const listStyles = computed(() =>
      getListStyles(horizontal, Math.max(...cols.value))
    )

    /**
     * 主动通知列表发生了一个事件，以使列表重新计算可视区域
     */
    function recordInteraction() {
      updateItems('recordInteraction')
    }

    let scrollTimer: number
    let scrollCount = 0

    const handleScroll = () => {
      if (scrollCount > 10) {
        // 每轮询10次更新一次
        scrollCount = 0
        clearTimeout(scrollTimer)
        updateItems('scroll')
      } else {
        clearTimeout(scrollTimer)
        scrollTimer = window.setTimeout(() => {
          scrollCount = 0
          updateItems('scroll')
        }, 17)
        scrollCount++
      }
    }

    const { scrollToOffset, scrollToEnd: _scrollToEnd } = useScrollTo(scrollEl)

    /**
     * 滑动到指定位置
     */
    const scrollTo: ScrollTo = options => {
      const animated = true
      let newOptions: ScrollToOffsetOptions

      if (typeof options === 'number') {
        newOptions = {
          x: horizontal ? options : 0,
          y: !horizontal ? options : 0,
          animated
        }
      } else {
        newOptions = {
          x: horizontal ? options.offset : 0,
          y: !horizontal ? options.offset : 0,
          animated: !(options.animated === false)
        }
      }

      return scrollToOffset(newOptions)
    }

    /**
     * 滑动到底
     */
    const scrollToEnd: ScrollToEnd = (animated = true) => {
      return _scrollToEnd({
        x: horizontal,
        y: !horizontal,
        animated
      })
    }

    /**
     * 滑动到第index个元素
     */
    const scrollToIndex: ScrollToIndex = options => {
      let index: number
      let animated = true
      let viewPosition: ViewPosition | undefined

      if (typeof options === 'number') {
        index = options
        options = {
          index
        }
      } else {
        index = options.index
        animated = !(options.animated === false)
        viewPosition = getViewPosition(options.viewPosition)
      }

      if (index < 0) {
        return
      } else if (index >= list.value.length) {
        scrollToEnd(animated)
        return
      }

      const startCos = calcGroups[getNearsetIndex(index, 'index')]
      const newCols = cloneData(startCos.cols)

      for (
        let i = startCos.index, len = Math.min(index, list.value.length - 1);
        i <= len;
        i++
      ) {
        const item = list.value[i]

        if (item.size === -1) {
          return
        }

        let offset = 0
        let colMinIndex = 0
        if (newCols.length > 1) {
          // 瀑布流
          offset = Math.min(...newCols)
          colMinIndex = newCols.indexOf(offset)
        } else {
          colMinIndex = 0
          offset = newCols[colMinIndex]
        }

        newCols[colMinIndex] += item.size

        if (i === len) {
          if (viewPosition === 0.5) {
            offset += item.size / 2 - wrapperSize.value / 2
          } else if (viewPosition === 1) {
            offset += item.size - wrapperSize.value
          }

          scrollTo({
            offset,
            animated
          })
        }
      }
    }

    watch(
      () => props.ids,
      val => {
        dataToList(val)
      },
      {
        deep: true
      }
    )

    const poolList = computed(() => {
      const newList: RenderItem[] = []

      list.value.forEach(item => {
        if (item.size === -1 && !renderList.value.some(v => v.id === item.id)) {
          newList.push(Object.assign({}, item))
        }
      })

      return newList
    })

    function resetScrollContainer($el: HTMLElement) {
      scrollEl.value = $el
      handleResize()
    }

    function handleResize() {
      const newSize = getElSize(scrollEl.value)

      if (newSize !== 0 && newSize !== wrapperSize.value) {
        wrapperSize.value = newSize
        resetCalc()
        updateItems('resize')
        emit('resize', newSize)
      }
    }

    useScroll(scrollEl, handleScroll)
    useResizeObserver(scrollEl, handleResize)

    onMounted(() => {
      resetScrollContainer(root.value as HTMLElement)
      dataToList(props.ids)
    })

    const classes = getClasses(horizontal)

    return {
      listEl,
      poolEl,
      poolList,
      renderList,
      classes,
      listStyles,
      root,
      horizontal,
      recordInteraction,
      handleScroll,
      scrollTo,
      scrollToIndex,
      scrollToEnd,
      updateItems,
      resetScrollContainer
    }
  }
})
</script>
