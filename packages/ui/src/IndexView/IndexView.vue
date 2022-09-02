<template>
  <div class="ak-index-view">
    <div class="ak-index-view_sidebar">
      <ul class="ak-index-view_list" ref="navEl">
        <li
          :class="{ active: item.value === activeIndex }"
          v-for="item in indexList"
          :data-value="item.value"
          :key="item.value"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="ak-index-view_body">
      <StickyView
        :offsetTop="stickyOffsetTop"
        ref="bodyRef"
        v-model:activeIndex="activeIndex"
        @resetItems="onResetItems"
        @change="onChange"
      >
        <slot></slot>
      </StickyView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { StickyView } from '../StickyView'
import { sizeValidator } from '../helpers/validator'
import { rangeInteger } from '../helpers/util'
import type {
  OnResetItems,
  StickyViewRef,
  OnChange as StickyViewOnChange
} from '../StickyView/types'
import { useTouch } from '../hooks/use-touch'
import { emitChangeValidator } from '../StickyView/props'
import type { ResetContainer } from '../Sticky/types'
import type { PropsToEmits } from '../helpers/types'
import type { IndexViewEmits } from './types'

export default defineComponent({
  name: 'ak-index-view',
  components: { StickyView },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: {
    change: emitChangeValidator
  } as PropsToEmits<IndexViewEmits>,
  setup(props, { emit }) {
    const navEl = ref<HTMLElement>()
    const bodyRef = ref<StickyViewRef>()
    const indexList = ref<
      {
        value: number
        label: string
      }[]
    >([])
    const activeIndex = ref(0)

    const resetContainer: ResetContainer = containSelector => {
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: OnResetItems = items => {
      indexList.value = items.map(item => {
        return {
          value: item.index,
          label: item.name
        }
      })
    }

    let oldIndex = 0
    const onChange: StickyViewOnChange = index => {
      emit('change', index, oldIndex)
      oldIndex = index
    }

    /**
     * 滚动到第index个
     * @param index 索引
     */
    function scrollToIndex(index: number) {
      bodyRef.value?.scrollToIndex(index)
    }

    let coords: any
    let changeTimer: number

    useTouch({
      el: navEl,
      onTouchStart(e) {
        const { clientY } = e.touchObject

        const $target = e.target as HTMLElement
        const value = parseInt($target.dataset.value as string)
        const rects = $target.getClientRects()[0]

        coords = {
          size: rects.height,
          offsetY: clientY - rects.top,
          startY: clientY,
          current: value
        }

        clearTimeout(changeTimer)
        changeTimer = window.setTimeout(() => {
          activeIndex.value = value
        }, 500)

        e.preventDefault()
      },

      onTouchMove(e) {
        if (!coords) {
          return
        }

        const { clientY } = e.touchObject
        const { startY, size, offsetY, current } = coords

        const y = clientY - startY

        let offsetCount = 0

        if (y > 0) {
          offsetCount =
            Math.floor(y / size) + (y % size > size - offsetY ? 1 : 0)
        } else if (y < 0) {
          offsetCount = -Math.floor(-y / size) + (-y % size > offsetY ? -1 : 0)
        }

        if (offsetCount !== 0) {
          clearTimeout(changeTimer)
          coords.isChange = true

          changeTimer = window.setTimeout(() => {
            activeIndex.value = rangeInteger(
              current + offsetCount,
              0,
              indexList.value.length - 1
            )
          }, 100)
        }

        e.stopPropagation()
      },

      onTouchEnd(e) {
        if (coords) {
          if (!coords.isChange) {
            clearTimeout(changeTimer)
            activeIndex.value = coords.current
          }

          coords = null
          e.stopPropagation()
        }
      }
    })

    onMounted(() => resetContainer(document.documentElement))

    return {
      navEl,
      bodyRef,
      activeIndex,
      indexList,
      onChange,
      scrollToIndex,
      resetContainer,
      onResetItems
    }
  }
})
</script>
