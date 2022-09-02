<template>
  <div ref="root" :class="classes">
    <div class="ak-sticky-view_list" ref="listEl">
      <slot></slot>
    </div>
    <Sticky
      :offsetTop="offsetTop"
      :containSelector="containSelector"
      :disabled="disabled"
      class="ak-sticky-view_top"
      ref="stickyRef"
    >
      <div class="ak-sticky-view_fixed">
        <div class="ak-sticky-view_fixed-inner" ref="fixedEl"></div>
      </div>
    </Sticky>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'
import { Sticky } from '../Sticky'
import {
  CSSProperties2CssText,
  getRelativeOffset,
  getScrollTop,
  getSizeValue,
  querySelector,
  scrollTo
} from '../helpers/dom'
import { selectorValidator, sizeValidator } from '../helpers/validator'
import { useScroll } from '../hooks/use-scroll'
import { useList } from '../hooks/use-list'
import { emitChangeValidator } from './props'
import {
  StickyViewItem,
  ScrollToOptions,
  ScrollToIndexOptions,
  StickyViewEmits
} from './types'
import type { PropsToEmits, Selector } from '../helpers/types'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import { getClasses, getFixedStyles, FIXED_HEIGHT } from './util'
import { isNumber, isString } from '../helpers/util'

export default defineComponent({
  name: 'ak-sticky-view',
  components: { Sticky },
  props: {
    // 纵向
    activeIndex: {
      type: Number,
      default: 0
    },
    containSelector: {
      type: [String, HTMLElement] as PropType<Selector>,
      validator: selectorValidator
    },
    offsetTop: {
      type: [Number, String],
      validator: sizeValidator,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    'update:activeIndex': activeIndex => isNumber(activeIndex),
    change: emitChangeValidator,
    resetItems: (items: StickyViewItem[]) => {
      if (Array.isArray(items)) {
        return (
          items.filter(item => {
            return !(item && isNumber(item.index) && isString(item.name))
          }).length === 0
        )
      }
      return false
    }
  } as PropsToEmits<StickyViewEmits>,
  setup(props, { emit }) {
    const root = ref<HTMLElement>()
    const container = ref<HTMLElement>()
    const fixedEl = ref<HTMLElement>()
    const stickyRef = ref<StickyRef>()
    const activeIndex = ref(0)
    const isSelfContainer = ref(false)

    let $items: HTMLElement[] = []
    let isScrollTo = false

    function getItemName(index: number) {
      return $items[index]?.dataset.name || ''
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

    function updateFixed(ss: number | null) {
      if (!fixedEl.value || !container.value) {
        return
      }

      if ($items.length === 0) {
        updateTitle('', null)
        return
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
          } else {
            if (!isScrollTo) {
              emit('update:activeIndex', activeIndex.value)
            }
            emit('change', activeIndex.value)
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
          } else {
            if (!isScrollTo) {
              emit('update:activeIndex', activeIndex.value)
            }

            emit('change', activeIndex.value)
          }
        }
      }

      isScrollTo = false
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
     * 滚动到第index个
     * @param options
     */
    function scrollToIndex(options: number | ScrollToIndexOptions) {
      let _index = 0

      if (typeof options === 'number') {
        _index = options
      } else if (options && typeof options.index === 'number') {
        _index = options.index
      }

      if ($items[_index] && _index != activeIndex.value) {
        scrollToOffset({
          offset: getRelativeOffset($items[_index], container.value).offsetTop
        })
      }
    }

    /**
     * 滚到到指定位置
     * @param options
     */
    function scrollToOffset(options: number | ScrollToOptions) {
      let offset = 0

      if (typeof options === 'number') {
        offset = options
      } else if (options && typeof options.offset === 'number') {
        offset = options.offset
      }

      isScrollTo = true
      scrollTo(container.value as HTMLElement, offset, false)
    }

    function resetItems(res: HTMLElement[]) {
      $items = res

      updateFixed(null)

      emit(
        'resetItems',
        $items.map((v, k) => {
          return {
            name: getItemName(k),
            index: k
          }
        })
      )
    }

    const { listEl } = useList('stickyView', resetItems)

    watch(
      () => props.activeIndex,
      val => scrollToIndex({ index: val })
    )

    onMounted(() => resetContainer(props.containSelector))

    const classes = computed(() => getClasses(isSelfContainer.value))

    return {
      root,
      listEl,
      fixedEl,
      stickyRef,
      classes,
      resetContainer,
      scrollToIndex,
      scrollTo: scrollToOffset
    }
  }
})
</script>
