<template>
  <div :class="classes">
    <div class="ak-tab-view_header ak-horizontal-hairline">
      <SideTab v-if="vertical" :options="tabList" v-model="activeIndex" />
      <Tab
        v-else
        :options="tabList"
        v-model="activeIndex"
        :scroll-threshold="scrollThreshold"
      />
    </div>
    <div class="ak-tab-view_body" ref="listEl">
      <Swiper
        :activeIndex="activeIndex"
        @activeIndexChange="onChange"
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
import { ref, defineComponent, provide, watch } from 'vue'
import { Tab } from '../Tab'
import { SideTab } from '../SideTab'
import { Swiper } from '../Swiper'
import { useList } from '../hooks/use-list'
import type {
  SwiperOnActiveIndexChange,
  SwiperOnAnimated,
  SwiperRef
} from '../Swiper/types'
import { emitChangeValidator } from '../Swiper/props'
import { getClasses } from './util'
import type { PropsToEmits } from '../helpers/types'
import type { TabViewEmits } from './types'
import { isNumber, isString } from '../helpers/util'

export default defineComponent({
  name: 'ak-tab-view',
  components: { Tab, SideTab, Swiper },
  props: {
    modelValue: {
      type: String
    },
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
    'update:modelValue': name => isString(name),
    change: (name, index) => isString(name) && isNumber(index),
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

    let nameArr: string[] = []

    function getActiveIndexByName(name?: string) {
      if (name) {
        for (let i = 0; i < nameArr.length; i++) {
          if (nameArr[i] === name) {
            return i
          }
        }
      }

      return -1
    }

    function resetItems($items: HTMLElement[]) {
      nameArr = []

      tabList.value = $items.map(($item, index) => {
        const { name, subTitle, title } = $item.dataset

        nameArr.push(name as string)

        return {
          value: index,
          label: title || name || '',
          subLabel: subTitle || ''
        }
      })
    }

    const { listEl } = useList('tabView', resetItems)

    const onChange: SwiperOnActiveIndexChange = index => {
      activeIndex.value = index

      const activeName = nameArr[index] || ''

      emit('update:modelValue', activeName)
      emit('change', activeName, index)
    }

    const onAnimated: SwiperOnAnimated = (index, fromIndex) => {
      emit('animated', index, fromIndex)
    }

    function swipeTo(index: number) {
      swiper.value?.swipeTo(index)
    }

    provide('akTabViewVertical', vertical.value)

    watch(
      () => props.modelValue,
      val => {
        const newIndex = getActiveIndexByName(val)
        if (newIndex !== -1 && newIndex !== activeIndex.value) {
          activeIndex.value = newIndex
        }
      }
    )

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
