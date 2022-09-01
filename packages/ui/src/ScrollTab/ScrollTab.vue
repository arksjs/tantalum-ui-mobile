<template>
  <div class="fx-scroll-tab">
    <div class="fx-scroll-tab_sidebar">
      <Sticky
        ref="sideRef"
        :offsetTop="stickyOffsetTop"
        :offsetBottom="stickyOffsetBottom"
      >
        <SideTab :options="tabList" v-model:activeValue="activeIndex" />
      </Sticky>
    </div>
    <div class="fx-scroll-tab_body">
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
import { SideTab } from '../SideTab'
import { Sticky } from '../Sticky'
import { StickyView } from '../StickyView'
import { sizeValidator } from '../helpers/validator'
import type { OnResetItems, StickyViewRef } from '../StickyView/types'
import type { OnChange as StickyViewOnChange } from '../StickyView/types'
import { emitChangeValidator } from '../StickyView/props'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import type { PropsToEmits } from '../helpers/types'
import type { ScrollTabEmits } from './types'

export default defineComponent({
  name: 'fx-scroll-tab',
  components: { SideTab, Sticky, StickyView },
  props: {
    stickyOffsetTop: {
      validator: sizeValidator,
      default: 0
    },
    stickyOffsetBottom: {
      validator: sizeValidator,
      default: 0
    }
  },
  emits: {
    change: emitChangeValidator
  } as PropsToEmits<ScrollTabEmits>,
  setup(props, { emit }) {
    const sideRef = ref<StickyRef>()
    const bodyRef = ref<StickyViewRef>()
    const tabList = ref<
      {
        value: number
        label: string
      }[]
    >([])
    const activeIndex = ref(0)

    const resetContainer: ResetContainer = containSelector => {
      sideRef.value?.resetContainer(containSelector)
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: OnResetItems = items => {
      tabList.value = items.map(item => {
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
      bodyRef.value && bodyRef.value.scrollToIndex(index)
    }

    onMounted(() => resetContainer(document.documentElement))

    return {
      sideRef,
      bodyRef,
      activeIndex,
      tabList,
      onChange,
      scrollToIndex,
      resetContainer,
      onResetItems
    }
  }
})
</script>
