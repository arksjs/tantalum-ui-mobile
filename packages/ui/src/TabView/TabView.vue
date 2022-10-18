<template>
  <div :class="classes">
    <div class="ak-tab-view_header ak-horizontal-hairline">
      <SideTab
        v-if="vertical && tabList.length > 0"
        :options="tabList"
        :modelValue="activeIndex"
        @change="onTabChange"
      />
      <Tab
        v-else-if="tabList.length > 0"
        :options="tabList"
        :modelValue="activeIndex"
        :scrollThreshold="scrollThreshold"
        @change="onTabChange"
      />
    </div>
    <div class="ak-tab-view_body" ref="listEl">
      <Swiper
        :activeIndex="activeIndex"
        @activeIndexChange="onSwiperChange"
        @animated="onSwiperAnimated"
        ref="swiperRef"
        :initialVertical="vertical"
        :bounces="false"
      >
        <slot></slot>
      </Swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, provide, watch, shallowRef } from 'vue'
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
import type { TabOnChange } from '../Tab/types'
import Exception from '../helpers/exception'

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
  setup(props, { emit, expose }) {
    const vertical = ref<boolean>(!!props.initialVertical)
    const swiperRef = shallowRef<SwiperRef | null>(null)
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

    const onTabChange: TabOnChange = index => {
      switchToIndex(index as number)
    }

    const onSwiperChange: SwiperOnActiveIndexChange = index => {
      activeIndex.value = index

      const activeName = nameArr[index] || ''

      emit('update:modelValue', activeName)
      emit('change', activeName, index)
    }

    const onSwiperAnimated: SwiperOnAnimated = (index, fromIndex) => {
      emit('animated', index, fromIndex)
    }

    function _switchTo(name: string, isProp: boolean) {
      const newIndex = getActiveIndexByName(name)

      if (newIndex === -1) {
        console.error(
          new Exception(
            'The "TabItem[name]" not found.',
            isProp ? Exception.TYPE.PROP_ERROR : Exception.TYPE.PARAM_ERROR,
            'TabView'
          )
        )
      } else if (newIndex !== activeIndex.value) {
        if (isProp) {
          activeIndex.value = newIndex
        } else {
          switchToIndex(newIndex)
        }
      }
    }

    function switchToIndex(index: number) {
      if (index >= 0 && index < tabList.value.length) {
        swiperRef.value?.swipeTo(index)
      } else {
        console.error(
          new Exception(
            'The "TabItem[index]" not found.',
            Exception.TYPE.PARAM_ERROR,
            'TabView'
          )
        )
      }
    }

    provide('akTabViewVertical', vertical.value)

    watch(
      () => props.modelValue,
      val => val != null && _switchTo(val, true)
    )

    const classes = getClasses(vertical.value)

    const switchTo = (name: string) => _switchTo(name, false)

    expose({
      switchTo,
      switchToIndex
    })

    return {
      activeIndex,
      tabList,
      vertical,
      listEl,
      onTabChange,
      swiperRef,
      onSwiperChange,
      onSwiperAnimated,
      classes,

      switchTo,
      switchToIndex
    }
  }
})
</script>
