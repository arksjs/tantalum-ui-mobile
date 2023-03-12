<template>
  <div ref="root" :class="classes">
    <StickyViewList ref="itemsRef" @resetItems="resetItems">
      <slot></slot>
    </StickyViewList>
    <Sticky
      :offsetTop="offsetTop"
      :containSelector="containSelector"
      :disabled="disabled"
      class="ta-sticky-view_top"
      ref="stickyRef"
    >
      <div class="ta-sticky-view_fixed">
        <div class="ta-sticky-view_fixed-inner" ref="fixedEl"></div>
      </div>
    </Sticky>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  nextTick,
  shallowRef,
  type PropType,
  VNode
} from 'vue'
import { Sticky } from '../Sticky'
import {
  CSSProperties2CssText,
  getRelativeOffset,
  getScrollTop,
  getSizeValue,
  querySelector,
  scrollTo as _scrollTo,
  selectorValidator,
  isSizeValue,
  isNumber,
  isString,
  type PropsToEmits,
  type Selector,
  getElementItems
} from '../helpers'
import StickyViewList from './StickyViewList.vue'
import { useScroll, useException, useOnce } from '../hooks'
import { emitChangeValidator } from './props'
import type {
  StickyViewEmits,
  StickyViewItem,
  StickyViewListRef
} from './types'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import { getClasses, getFixedStyles, FIXED_HEIGHT } from './util'

export default defineComponent({
  name: 'ta-sticky-view',
  components: { Sticky, StickyViewList },
  props: {
    modelValue: {
      type: String
    },
    containSelector: {
      type: [String, HTMLElement] as PropType<Selector>,
      validator: selectorValidator
    },
    offsetTop: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:modelValue': name => isString(name),
    change: emitChangeValidator,
    resetItems: items => {
      if (Array.isArray(items)) {
        return (
          items.filter(item => {
            return !(
              item &&
              isNumber(item.index) &&
              isString(item.name) &&
              isString(item.title)
            )
          }).length === 0
        )
      }
      return false
    }
  } as PropsToEmits<StickyViewEmits>,
  setup(props, { emit, expose }) {
    const { printListItemNotFoundError } = useException()
    const root = shallowRef<HTMLElement | null>(null)
    const container = shallowRef<HTMLElement | null>(null)
    const fixedEl = shallowRef<HTMLElement | null>(null)
    const stickyRef = shallowRef<StickyRef | null>(null)
    const itemsRef = shallowRef<StickyViewListRef | null>(null)
    const activeIndex = ref(0)
    const isSelfContainer = ref(false)

    let cachedItems: StickyViewItem[] = []
    let $items: HTMLElement[] = []
    let isSpecifyScrolling = false // 是否指定滚动

    const once = useOnce()

    function getItemName(index: number) {
      return cachedItems[index]?.name || ''
    }

    function getActiveIndexByName(name?: string) {
      if (name) {
        for (let i = 0; i < $items.length; i++) {
          if (getItemName(i) === name) {
            return i
          }
        }
      }

      return -1
    }

    let oldIndex = -1

    function onChange() {
      if (oldIndex !== activeIndex.value) {
        const name = getItemName(activeIndex.value)
        emit('update:modelValue', name)
        emit('change', name, activeIndex.value)
      }
      oldIndex = -1
    }

    function updateTitle(t: string, tY: number | null) {
      if (!fixedEl.value) {
        return
      }

      fixedEl.value.textContent = t
      fixedEl.value.style.cssText = CSSProperties2CssText(getFixedStyles(tY))
    }

    function updateFixed(ss: number | null) {
      if (!fixedEl.value || !container.value) {
        return
      }

      if ($items.length === 0) {
        updateTitle('', null)
        return
      }

      if (oldIndex === -1) {
        oldIndex = activeIndex.value
      }

      const scrollTop = ss == null ? getScrollTop(container.value) : ss

      const _index = activeIndex.value
      const nextIndex = _index + 1
      const offsetTops = getOffsetTops()

      const current = offsetTops[_index]
      const next =
        offsetTops[nextIndex] != null ? offsetTops[nextIndex] : Infinity
      const first = offsetTops[0]

      if (scrollTop < first) {
        updateTitle('', null)
      } else if (scrollTop >= current) {
        if (scrollTop >= next) {
          activeIndex.value = nextIndex
          updateTitle(getItemName(nextIndex), 0)

          if (
            offsetTops[nextIndex + 1] &&
            scrollTop >= offsetTops[nextIndex + 1]
          ) {
            // 超过了
            updateFixed(scrollTop)
          } else if (!isSpecifyScrolling) {
            onChange()
          }
        } else if (next - scrollTop < FIXED_HEIGHT) {
          updateTitle(getItemName(_index), next - scrollTop - FIXED_HEIGHT)
        } else {
          updateTitle(getItemName(_index), 0)
        }
      } else {
        if (current - scrollTop < FIXED_HEIGHT) {
          updateTitle(
            getItemName(_index - 1),
            current - scrollTop - FIXED_HEIGHT
          )
        } else {
          activeIndex.value = _index - 1
          updateTitle(getItemName(_index - 1), 0)

          if (offsetTops[_index - 1] && offsetTops[_index - 1] > scrollTop) {
            updateFixed(scrollTop)
          } else if (!isSpecifyScrolling) {
            onChange()
          }
        }
      }

      isSpecifyScrolling &&
        once(() => {
          // 有一些指定滑动到相应位置，移动中间不需要不断上报onChange，只要上报最后一个
          isSpecifyScrolling = false
          onChange()
        })
    }

    function getOffsetTops() {
      const offset =
        getRelativeOffset(
          getListEl() as HTMLElement,
          container.value as HTMLElement
        ).offsetTop - getSizeValue(props.offsetTop)

      return $items.map($el => {
        return $el.offsetTop + offset
      })
    }

    /**
     * 滚到到指定位置
     */
    function scrollToOffset(offset: number) {
      isSpecifyScrolling = true
      // 在onMounted后还需要nextTick才能有效调用滚动
      nextTick(() => _scrollTo(container.value as HTMLElement, offset, false))
    }

    /**
     * 滚动到第index个
     */
    function scrollToIndex(newIndex: number) {
      if ($items[newIndex]) {
        if (newIndex != activeIndex.value && container.value) {
          scrollToOffset(
            getRelativeOffset($items[newIndex], container.value).offsetTop
          )
        }
      } else {
        printListItemNotFoundError('index')
      }
    }

    /**
     * 滚动到指定name
     */
    function scrollTo(name: string) {
      const newIndex = getActiveIndexByName(name)

      if (newIndex !== -1) {
        scrollToIndex(newIndex)
      } else {
        printListItemNotFoundError('name')
      }
    }

    useScroll(container, () => updateFixed(null))

    const resetContainer: ResetContainer = containSelector => {
      const newEl =
        querySelector(containSelector) || (root.value as HTMLElement)

      if (newEl === container.value) {
        return
      }

      container.value = newEl
      isSelfContainer.value = container.value === root.value
      stickyRef.value?.resetContainer(newEl)

      updateFixed(null)
    }

    function getListEl() {
      return itemsRef.value?.ref || null
    }

    function isSameItems(a: StickyViewItem[], b: StickyViewItem[]) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!(a[i].name === b[i].name && a[i].title === b[i].title)) {
          return false
        }
      }
      return true
    }

    function resetItems(_items: VNode[]) {
      $items = getElementItems(getListEl(), 'ta-sticky-view-item')

      updateFixed(null)

      const newItems: StickyViewItem[] = _items.map((item, index) => {
        return {
          index,
          name: item.props?.name || '',
          title: item.props?.title || item.props?.name || ''
        }
      })

      if (!isSameItems(newItems, cachedItems)) {
        cachedItems = newItems
        emit('resetItems', newItems)
      }
    }

    function updateValue(val?: string) {
      const newIndex = getActiveIndexByName(val)

      if (newIndex !== -1) {
        if (newIndex != activeIndex.value) {
          // 把oldIndex设置为最新，阻止onChange被调用
          oldIndex = newIndex
          scrollToIndex(newIndex)
        }
      } else {
        printListItemNotFoundError('modelValue', true)
      }
    }

    watch(() => props.modelValue, updateValue)

    onMounted(() => {
      resetContainer(props.containSelector)

      $items = getElementItems(getListEl(), 'ta-sticky-view-item')
      // 首次设置 modelValue 非string类型认为是没配置，不做更新
      props.modelValue != null && updateValue(props.modelValue)
    })

    const classes = computed(() => getClasses(isSelfContainer.value))

    expose({
      scrollTo,
      scrollToIndex,
      scrollToOffset,
      resetContainer
    })

    return {
      root,
      fixedEl,
      itemsRef,
      stickyRef,
      classes,
      resetItems,

      scrollTo,
      scrollToIndex,
      scrollToOffset,
      resetContainer
    }
  }
})
</script>
