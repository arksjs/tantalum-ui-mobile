<template>
  <div ref="root" :class="classes">
    <div class="ta-sticky-view_list" ref="listEl">
      <slot></slot>
    </div>
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
  type PropType
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
  type Selector
} from '../helpers'
import { useScroll, useList, useException, useOnce } from '../hooks'
import { emitChangeValidator } from './props'
import type { StickyViewEmits } from './types'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import { getClasses, getFixedStyles, FIXED_HEIGHT } from './util'

export default defineComponent({
  name: 'ta-sticky-view',
  components: { Sticky },
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
    const activeIndex = ref(0)
    const isSelfContainer = ref(false)

    let $items: HTMLElement[] = []
    let isSpecifyScrolling = false // ??????????????????

    const once = useOnce()

    function getItemName(index: number) {
      return $items[index]?.dataset.name || ''
    }

    function getItemTitle(index: number) {
      return $items[index]?.dataset.title || getItemName(index)
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

    useScroll(container, () => updateFixed(null))

    const resetContainer: ResetContainer = containSelector => {
      container.value =
        querySelector(containSelector) || (root.value as HTMLElement)
      isSelfContainer.value = container.value === root.value

      stickyRef.value?.resetContainer(container.value)

      updateFixed(null)
    }

    function updateTitle(t: string, tY: number | null) {
      if (!fixedEl.value) {
        return
      }

      fixedEl.value.textContent = t
      fixedEl.value.style.cssText = CSSProperties2CssText(getFixedStyles(tY))
    }

    function onChange() {
      if (oldIndex !== activeIndex.value) {
        const name = getItemName(activeIndex.value)
        emit('update:modelValue', name)
        emit('change', name, activeIndex.value)
      }
      oldIndex = -1
    }

    let oldIndex = -1

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
            // ?????????
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
          // ????????????????????????????????????????????????????????????????????????onChange???????????????????????????
          isSpecifyScrolling = false
          onChange()
        })
    }

    function getOffsetTops() {
      const offset =
        getRelativeOffset(
          listEl.value as HTMLElement,
          container.value as HTMLElement
        ).offsetTop - getSizeValue(props.offsetTop)

      return $items.map($el => {
        return $el.offsetTop + offset
      })
    }

    /**
     * ?????????????????????
     */
    function scrollToOffset(offset: number) {
      isSpecifyScrolling = true
      // ???onMounted????????????nextTick????????????????????????
      nextTick(() => _scrollTo(container.value as HTMLElement, offset, false))
    }

    function resetItems(res: HTMLElement[]) {
      $items = res

      updateFixed(null)

      emit(
        'resetItems',
        $items.map((v, k) => {
          return {
            name: getItemName(k),
            index: k,
            title: getItemTitle(k)
          }
        })
      )
    }

    /**
     * ????????????index???
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
     * ???????????????name
     */
    function scrollTo(name: string) {
      const newIndex = getActiveIndexByName(name)

      if (newIndex !== -1) {
        scrollToIndex(newIndex)
      } else {
        printListItemNotFoundError('name')
      }
    }

    const { listEl } = useList('stickyView', resetItems)

    function updateValue(val?: string) {
      const newIndex = getActiveIndexByName(val)

      if (newIndex !== -1) {
        if (newIndex != activeIndex.value) {
          // ???oldIndex????????????????????????onChange?????????
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
      // ???????????? modelValue ???string???????????????????????????????????????
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
      listEl,
      fixedEl,
      stickyRef,
      classes,

      scrollTo,
      scrollToIndex,
      scrollToOffset,
      resetContainer
    }
  }
})
</script>
