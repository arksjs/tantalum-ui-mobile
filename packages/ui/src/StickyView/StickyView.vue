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
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  nextTick,
  shallowRef
} from 'vue'
import type { PropType } from 'vue'
import { Sticky } from '../Sticky'
import {
  CSSProperties2CssText,
  getRelativeOffset,
  getScrollTop,
  getSizeValue,
  querySelector,
  scrollTo as _scrollTo
} from '../helpers/dom'
import { selectorValidator, sizeValidator } from '../helpers/validator'
import { useScroll } from '../hooks/use-scroll'
import { useList } from '../hooks/use-list'
import { emitChangeValidator } from './props'
import type { StickyViewEmits } from './types'
import type { PropsToEmits, Selector } from '../helpers/types'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import { getClasses, getFixedStyles, FIXED_HEIGHT } from './util'
import { isNumber, isString } from '../helpers/util'
import Exception from '../helpers/exception'
import { useOnce } from '../hooks/use-once'

export default defineComponent({
  name: 'ak-sticky-view',
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
      validator: sizeValidator,
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
    const root = ref<HTMLElement | null>(null)
    const container = shallowRef<HTMLElement | null>(null)
    const fixedEl = ref<HTMLElement | null>(null)
    const stickyRef = ref<StickyRef>()
    const activeIndex = ref(0)
    const isSelfContainer = ref(false)

    let $items: HTMLElement[] = []
    let isSpecifyScrolling = false // 是否指定滚动

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
          listEl.value as HTMLElement,
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
        console.error(
          new Exception(
            'The "StickyViewItem[index]" not found.',
            Exception.TYPE.PARAM_ERROR,
            'StickyView'
          )
        )
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
        console.error(
          new Exception(
            'The "StickyViewItem[name]" not found.',
            Exception.TYPE.PARAM_ERROR,
            'StickyView'
          )
        )
      }
    }

    const { listEl } = useList('stickyView', resetItems)

    function updateValue(val?: string) {
      const newIndex = getActiveIndexByName(val)

      if (newIndex !== -1) {
        if (newIndex != activeIndex.value) {
          // 把oldIndex设置为最新，阻止onChange被调用
          oldIndex = newIndex
          scrollToIndex(newIndex)
        }
      } else {
        console.error(
          new Exception(
            'The "StickyViewItem[modelValue]" not found.',
            Exception.TYPE.PROP_ERROR,
            'StickyView'
          )
        )
      }
    }

    watch(() => props.modelValue, updateValue)

    onMounted(() => {
      resetContainer(props.containSelector)
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
      listEl,
      fixedEl,
      stickyRef,
      classes
    }
  }
})
</script>
