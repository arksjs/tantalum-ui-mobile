<template>
  <div :class="classes">
    <div class="ta-scroll-tab_bar">
      <Sticky
        ref="sideRef"
        :offsetTop="stickyOffsetTop"
        :offsetBottom="sideBar ? stickyOffsetBottom : undefined"
      >
        <Tab
          class="ta-scroll-tab_tab"
          v-if="!sideBar && tabList.length > 0"
          v-bind="tabProps"
          :options="tabList"
          :modelValue="activeName"
          @change="onTabChange"
        />
        <SideTab
          class="ta-scroll-tab_tab"
          v-else-if="sideBar && tabList.length > 0"
          v-bind="tabProps"
          :options="tabList"
          :modelValue="activeName"
          @change="onTabChange"
        />
      </Sticky>
    </div>
    <div class="ta-scroll-tab_body">
      <StickyView
        :offsetTop="viewOffsetTop"
        :modelValue="modelValue"
        :disabledHeader="!sideBar"
        :enablePullRefreshUp="enablePullRefreshUp"
        :enablePullRefreshDown="enablePullRefreshDown"
        :pullRefreshTexts="pullRefreshTexts"
        ref="bodyRef"
        @resetItems="onResetItems"
        @change="onStickyViewChange"
        @pullRefreshing="onPullRefreshing"
        @scroll="onScroll"
      >
        <slot></slot>
      </StickyView>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, watch, computed, type PropType } from 'vue'
import { Tab } from '../Tab'
import { SideTab } from '../SideTab'
import { Sticky } from '../Sticky'
import { StickyView } from '../StickyView'
import { isSizeValue, isString, getSizeValue, type PropsToEmits } from '../helpers'
import type {
  StickyViewOnResetItems,
  StickyViewRef,
  StickyViewOnChange,
  StickyViewOnScroll,
  StickyViewOnPullRefreshing
} from '../StickyView/types'
import { emitChangeValidator } from '../StickyView/props'
import type { ResetContainer, StickyRef } from '../Sticky/types'
import type {
  ScrollTabEmits,
  ScrollTabPullRefreshTexts,
  ScrollTabRef,
  ScrollTabTabProp
} from './types'
import { getClasses } from './util'
import { TAB_HEIGHT } from '../Tab/util'
import { emitRefreshingValidator, emitScrollValidator } from '../ScrollView/props'
import type { TabOnChange } from '../Tab/types'

export default defineComponent({
  name: 'ta-scroll-tab',
  components: { Tab, SideTab, Sticky, StickyView },
  props: {
    modelValue: {
      type: String
    },
    stickyOffsetTop: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    },
    stickyOffsetBottom: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    },
    sideBar: {
      type: Boolean,
      default: true
    },
    // 允许上拉刷新
    enablePullRefreshUp: {
      type: Boolean,
      default: false
    },
    // 允许下拉刷新
    enablePullRefreshDown: {
      type: Boolean,
      default: false
    },
    // 下拉刷新提示文案
    pullRefreshTexts: {
      type: Object as PropType<ScrollTabPullRefreshTexts>
    },
    // 滚动挂在到document上
    documentContainer: {
      type: Boolean,
      default: true
    },
    tabProps: {
      type: Object as PropType<ScrollTabTabProp>
    }
  },
  emits: {
    'update:modelValue': name => isString(name),
    change: emitChangeValidator,
    pullRefreshing: emitRefreshingValidator,
    scroll: emitScrollValidator
  } as PropsToEmits<ScrollTabEmits>,
  setup(props, { emit, expose }) {
    const sideRef = shallowRef<StickyRef | null>(null)
    const bodyRef = shallowRef<StickyViewRef | null>(null)
    const tabList = ref<
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
      for (let i = 0; i < tabList.value.length; i++) {
        if (tabList.value[i].value === name) {
          return true
        }
      }

      return false
    }

    const onTabChange: TabOnChange = (_, index) => {
      scrollToIndex(index)
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

    const resetContainer: ResetContainer = containSelector => {
      sideRef.value?.resetContainer(containSelector)
      bodyRef.value?.resetContainer(containSelector)
    }

    const onResetItems: StickyViewOnResetItems = items => {
      tabList.value = items.map(item => {
        return {
          ...item.tabItemProps,
          value: item.name,
          label: item.title || item.name
        }
      })
    }

    const viewOffsetTop = computed(
      () => getSizeValue(props.stickyOffsetTop) + (props.sideBar ? 0 : TAB_HEIGHT)
    )

    const onPullRefreshing: StickyViewOnPullRefreshing = (payload, loadComplete) => {
      emit('pullRefreshing', payload, loadComplete)
    }

    const onScroll: StickyViewOnScroll = payload => {
      emit('scroll', payload)
    }

    const classes = computed(() => getClasses(props.sideBar))

    watch(
      () => props.modelValue,
      val => updateActiveName(val)
    )

    onMounted(() => {
      resetContainer(props.documentContainer ? document.documentElement : undefined)
      updateActiveName(props.modelValue)
      if (activeName.value == null && tabList.value.length > 0) {
        // 首次要写入一个
        activeName.value = tabList.value[0].value
      }
    })

    expose({
      scrollTo,
      scrollToIndex,
      resetContainer
    } as ScrollTabRef)

    return {
      viewOffsetTop,
      classes,
      sideRef,
      bodyRef,
      activeName,
      tabList,
      onTabChange,
      onStickyViewChange,
      onResetItems,
      onPullRefreshing,
      onScroll,

      scrollTo,
      scrollToIndex,
      resetContainer
    }
  }
})
</script>
