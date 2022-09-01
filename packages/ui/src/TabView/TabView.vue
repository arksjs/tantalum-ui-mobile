<template>
  <div :class="classes">
    <div class="fx-tab-view_header fx-horizontal-hairline">
      <SideTab
        v-if="vertical"
        :options="tabList"
        v-model:activeValue="activeIndex"
      />
      <Tab
        v-else
        :options="tabList"
        v-model:activeValue="activeIndex"
        :scroll-threshold="scrollThreshold"
      />
    </div>
    <div class="fx-tab-view_body" ref="listEl">
      <Swiper
        v-model:activeIndex="activeIndex"
        @change="onChange"
        @animated="onAnimated"
        ref="swiper"
        :initialVertical="vertical"
        :bounces="false"
      >
        <slot></slot>
      </Swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, provide } from 'vue'
import { Tab } from '../Tab'
import { SideTab } from '../SideTab'
import { Swiper } from '../Swiper'
import { useList } from '../hooks/use-list'
import type {
  OnChange as SwiperOnChange,
  OnAnimated as SwiperOnAnimated,
  SwiperRef
} from '../Swiper/types'
import { emitChangeValidator } from '../Swiper/props'
import { getClasses } from './util'
import type { PropsToEmits } from '../helpers/types'
import type { TabViewEmits } from './types'

export default defineComponent({
  name: 'fx-tab-view',
  components: { Tab, SideTab, Swiper },
  props: {
    // 纵向
    initialVertical: {
      type: Boolean,
      default: false
    },
    scrollThreshold: {
      type: Number,
      default: 4
    }
  },
  emits: {
    change: emitChangeValidator,
    animated: emitChangeValidator
  } as PropsToEmits<TabViewEmits>,
  setup(props, { emit }) {
    const vertical = ref<boolean>(!!props.initialVertical)
    const swiper = ref<SwiperRef>()
    const tabList = ref<
      {
        value: number
        label: string
        subLabel: string
      }[]
    >([])
    const activeIndex = ref(0)

    function resetItems($items: HTMLElement[]) {
      tabList.value = $items.map(($item, index) => {
        const { name, subName } = $item.dataset

        return {
          value: index,
          label: name || '',
          subLabel: subName || ''
        }
      })
    }

    const { listEl } = useList('tabView', resetItems)

    const onChange: SwiperOnChange = (activeIndex, fromIndex) => {
      emit('change', activeIndex, fromIndex)
    }

    const onAnimated: SwiperOnAnimated = (activeIndex, fromIndex) => {
      emit('animated', activeIndex, fromIndex)
    }

    function swipeTo(activeIndex: number) {
      swiper.value?.swipeTo(activeIndex)
    }

    provide('fxTabViewVertical', vertical.value)

    const classes = getClasses(vertical.value)

    return {
      activeIndex,
      tabList,
      vertical,
      listEl,
      swiper,
      onChange,
      onAnimated,
      swipeTo,
      classes
    }
  }
})
</script>
