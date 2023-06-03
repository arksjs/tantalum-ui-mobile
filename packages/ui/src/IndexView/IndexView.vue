<template>
  <div class="ta-index-view">
    <div class="ta-index-view_sidebar">
      <ul
        class="ta-index-view_list"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @mousedown="onTouchStart"
        @mousemove="onTouchMove"
        @mouseup="onTouchEnd"
        @mouseleave="onTouchEnd"
        @dragstart="onDragStart"
      >
        <li
          :class="{ active: item.value === activeName }"
          v-for="(item, index) in indexList"
          :data-value="item.value"
          :data-index="index"
          :key="item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="ta-index-view_body">
      <StickyView
        :offsetTop="stickyOffsetTop"
        :modelValue="modelValue"
        ref="bodyRef"
        @resetItems="onResetItems"
        @change="onStickyViewChange"
      >
        <slot></slot>
      </StickyView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, watch } from 'vue'
import { StickyView } from '../StickyView'
import { isSizeValue, isString, rangeInteger, type PropsToEmits } from '../helpers'
import type { StickyViewOnResetItems, StickyViewRef, StickyViewOnChange } from '../StickyView/types'
import { useOnce, useTouch } from '../hooks'
import { emitChangeValidator } from '../StickyView/props'
import type { ResetContainer } from '../Sticky/types'
import type { IndexViewEmits } from './types'

export default defineComponent({
  name: 'ta-index-view',
  components: { StickyView },
  props: {
    modelValue: {
      type: String
    },
    stickyOffsetTop: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    }
  },
  emits: {
    'update:modelValue': name => isString(name),
    change: emitChangeValidator
  } as PropsToEmits<IndexViewEmits>,
  setup(props, { emit, expose }) {
    const bodyRef = shallowRef<StickyViewRef | null>(null)
    const indexList = ref<
      {
        value: string
        label: string
      }[]
    >([])
    const activeName = ref<string>()

    // 单独更新以下tab的activeName
    function updateActiveName(name?: string) {
      if (name != null && nameInList(name) && name !== activeName.value) {
        activeName.value = name
      }
    }

    function nameInList(name: string) {
      for (let i = 0; i < indexList.value.length; i++) {
        if (indexList.value[i].value === name) {
          return true
        }
      }

      return false
    }

    const onStickyViewChange: StickyViewOnChange = (name, index) => {
      updateActiveName(name)
      emit('update:modelValue', name)
      emit('change', name, index)
    }

    /**
     * 滚动到第index个
     */
    function scrollToIndex(index: number) {
      bodyRef.value?.scrollToIndex(index)
    }

    /**
     * 滚动到指定name
     */
    function scrollTo(name: string) {
      bodyRef.value?.scrollTo(name)
    }

    let coords: {
      size: number
      offsetY: number
      startY: number
      current: number
      isChange: boolean
    } | null = null
    const lazyDo = useOnce(100)

    const { onTouchStart, onTouchMove, onTouchEnd, onDragStart } = useTouch({
      onStart(e) {
        const { clientY } = e.touchObject

        const $target = e.target as HTMLElement
        const index = parseInt($target.dataset.index as string)
        const rects = $target.getClientRects()[0]

        coords = {
          size: rects.height,
          offsetY: clientY - rects.top,
          startY: clientY,
          current: index,
          isChange: false
        }

        lazyDo(() => {
          scrollToIndex(index)
        }, 500)

        e.preventDefault()
      },

      onMove(e) {
        if (!coords) {
          return
        }

        const { clientY } = e.touchObject
        const { startY, size, offsetY, current } = coords

        const y = clientY - startY

        let offsetCount = 0

        if (y > 0) {
          offsetCount = Math.floor(y / size) + (y % size > size - offsetY ? 1 : 0)
        } else if (y < 0) {
          offsetCount = -Math.floor(-y / size) + (-y % size > offsetY ? -1 : 0)
        }

        if (offsetCount !== 0) {
          coords.isChange = true

          lazyDo(() => {
            scrollToIndex(rangeInteger(current + offsetCount, 0, indexList.value.length - 1))
          })
        }

        e.stopPropagation()
      },

      onEnd(e) {
        if (coords) {
          if (!coords.isChange) {
            const toIndex = coords.current

            lazyDo(() => {
              scrollToIndex(toIndex)
            }, 0)
          }

          coords = null
          e.stopPropagation()
        }
      }
    })

    const resetContainer: ResetContainer = containSelector => {
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: StickyViewOnResetItems = items => {
      indexList.value = items.map(item => {
        return {
          value: item.name,
          label: item.title
        }
      })
    }

    watch(
      () => props.modelValue,
      val => updateActiveName(val)
    )

    onMounted(() => {
      resetContainer(document.documentElement)
      updateActiveName(props.modelValue)
      if (activeName.value == null && indexList.value.length > 0) {
        // 首次要写入一个
        activeName.value = indexList.value[0].value
      }
    })

    expose({
      scrollTo,
      scrollToIndex,
      resetContainer
    })

    return {
      bodyRef,
      activeName,
      indexList,
      onStickyViewChange,
      onResetItems,

      scrollTo,
      scrollToIndex,
      resetContainer,

      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onDragStart
    }
  }
})
</script>
