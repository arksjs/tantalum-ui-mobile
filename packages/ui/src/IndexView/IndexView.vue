<template>
  <div class="ak-index-view">
    <div class="ak-index-view_sidebar">
      <ul class="ak-index-view_list" ref="navEl">
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
    <div class="ak-index-view_body">
      <StickyView
        :offsetTop="stickyOffsetTop"
        :modelValue="modelValue"
        ref="bodyRef"
        @resetItems="onResetItems"
        @change="onChange"
      >
        <slot></slot>
      </StickyView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { StickyView } from '../StickyView'
import { sizeValidator } from '../helpers/validator'
import { isString, rangeInteger } from '../helpers/util'
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
    modelValue: {
      type: String
    },
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: {
    'update:modelValue': name => isString(name),
    change: emitChangeValidator
  } as PropsToEmits<IndexViewEmits>,
  setup(props, { emit, expose }) {
    const navEl = ref<HTMLElement>()
    const bodyRef = ref<StickyViewRef>()
    const indexList = ref<
      {
        value: string
        label: string
      }[]
    >([])
    const activeName = ref<string>()

    // 单独更新以下tab的activeName
    function updateActiveName(name?: string) {
      if (name != null && isInTab(name) && name !== activeName.value) {
        activeName.value = name
      }
    }

    function isInTab(name: string) {
      for (let i = 0; i < indexList.value.length; i++) {
        if (indexList.value[i].value === name) {
          return true
        }
      }

      return false
    }

    const resetContainer: ResetContainer = containSelector => {
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: OnResetItems = items => {
      indexList.value = items.map(item => {
        return {
          value: item.name,
          label: item.title
        }
      })
    }

    const onChange: StickyViewOnChange = (name, index) => {
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
    let changeTimer: number

    useTouch({
      el: navEl,
      onTouchStart(e) {
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

        clearTimeout(changeTimer)
        changeTimer = window.setTimeout(() => {
          scrollToIndex(index)
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
            scrollToIndex(
              rangeInteger(current + offsetCount, 0, indexList.value.length - 1)
            )
          }, 100)
        }

        e.stopPropagation()
      },

      onTouchEnd(e) {
        if (coords) {
          if (!coords.isChange) {
            clearTimeout(changeTimer)
            scrollToIndex(coords.current)
          }

          coords = null
          e.stopPropagation()
        }
      }
    })

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
      navEl,
      bodyRef,
      activeName,
      indexList,
      onChange,
      onResetItems
    }
  }
})
</script>
