<template>
  <ScrollView
    :class="classes"
    :scrollX="horizontal"
    :scrollY="!horizontal"
    :lowerThreshold="lowerThreshold"
    :enablePullDirections="enablePullDirections"
    @scroll="onScroll"
    @scrollToLower="onScrollToLower"
    @refreshing="onRefreshing"
    ref="scrollViewRef"
  >
    <div class="ak-flat-list_header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <VirtualList
      ref="virtualListRef"
      :ids="ids"
      :initialHorizontal="initialHorizontal"
      :initialWaterfallCount="initialWaterfallCount"
      :itemSize="itemSize"
      :preLoad="preLoad"
      :approvedItemVisibleScale="approvedItemVisibleScale"
      @visibleItemsChange="onVisibleItemsChange"
      @resize="onResize"
    >
      <template #default="item">
        <slot :id="item.id" :index="item.index"> </slot>
        <slot name="separator" :id="item.id" :index="item.index"></slot>
      </template>
    </VirtualList>
    <LoadMore
      class="ak-flat-list_indicator"
      loading
      :vertical="horizontal"
      v-if="lowerLoading && ids.length > 0"
    >
      {{ locale.flatListLoadingText }}
    </LoadMore>
    <div class="ak-flat-list_empty" v-if="ids.length === 0">
      <slot name="empty"></slot>
    </div>
    <div class="ak-flat-list_footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </ScrollView>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, shallowRef } from 'vue'
import { LoadMore } from '../LoadMore'
import { ScrollView } from '../ScrollView'
import { VirtualList } from '../VirtualList'
import type {
  OnVisibleItemsChange,
  ScrollToEnd,
  ScrollToIndex,
  ScrollTo,
  VirtualListRef
} from '../VirtualList/types'
import { useLocale } from '../ConfigProvider/context'
import type { OnRefreshing, OnScroll, PullDirection } from '../ScrollView/types'
import {
  emitRefreshingValidator,
  emitScrollValidator
} from '../ScrollView/props'
import {
  emitVisibleItemsChangeValidator,
  virtualListProps
} from '../VirtualList/props'
import { getClasses } from './util'
import { isNumber } from '../helpers/util'
import type { PropsToEmits } from '../helpers/types'
import type { FlatListEmits } from './types'

export default defineComponent({
  name: 'ak-flat-list',
  components: { ScrollView, LoadMore, VirtualList },
  props: {
    ...virtualListProps,
    // 决定当距离内容最底部还有多远时触发endReached回调
    endReachedThreshold: {
      type: Number,
      default: 0.5
    },
    // 是否开启下拉刷新
    enablePullRefresh: {
      type: Boolean,
      default: false
    },
    // 展示加载更多图标
    lowerLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    endReached: payload => payload && isNumber(payload.distanceFromEnd),
    scroll: emitScrollValidator,
    refreshing: emitRefreshingValidator,
    visibleItemsChange: emitVisibleItemsChangeValidator
  } as PropsToEmits<FlatListEmits>,
  setup(props, { emit }) {
    const { locale } = useLocale()
    const scrollViewRef = shallowRef<InstanceType<typeof ScrollView> | null>(
      null
    )
    const virtualListRef = shallowRef<VirtualListRef | null>(null)

    const wrapperSize = ref(0)
    let horizontal = false

    if (props.initialWaterfallCount <= 1 && props.initialHorizontal) {
      horizontal = true
    }

    function getScrollContainer() {
      return scrollViewRef.value?.$el as HTMLElement
    }

    function onResize(size: number) {
      wrapperSize.value = size
    }

    const onRefreshing: OnRefreshing = (res, loadComplete) => {
      emit('refreshing', res, loadComplete)
    }

    const onVisibleItemsChange: OnVisibleItemsChange = res => {
      emit('visibleItemsChange', res)
    }

    /**
     * 主动通知列表发生了一个事件，以使列表重新计算可视区域
     */
    function recordInteraction() {
      virtualListRef.value?.recordInteraction()
    }

    const onScroll: OnScroll = res => {
      // scroll 事件回调
      emit('scroll', res)
    }

    function onScrollToLower() {
      const $el = getScrollContainer()
      const distanceFromEnd = horizontal
        ? $el.scrollWidth - $el.scrollLeft - $el.offsetWidth
        : $el.scrollHeight - $el.scrollTop - $el.offsetHeight

      emit('endReached', {
        distanceFromEnd
      })
    }

    const scrollTo: ScrollTo = options => {
      virtualListRef.value?.scrollTo(options as any)
    }
    const scrollToIndex: ScrollToIndex = options => {
      virtualListRef.value?.scrollToIndex(options as any)
    }
    const scrollToEnd: ScrollToEnd = animated => {
      virtualListRef.value?.scrollToEnd(animated)
    }

    const lowerThreshold = computed(() => {
      return wrapperSize.value * props.endReachedThreshold
    })

    const enablePullDirections = computed<PullDirection[]>(() => {
      if (props.enablePullRefresh) {
        return horizontal ? ['right'] : ['down']
      }

      return []
    })

    onMounted(() => {
      if (scrollViewRef.value) {
        virtualListRef.value?.resetScrollContainer(getScrollContainer())
      }
    })

    const classes = getClasses(horizontal)

    return {
      classes,
      scrollViewRef,
      virtualListRef,
      horizontal,
      lowerThreshold,
      enablePullDirections,
      onRefreshing,
      recordInteraction,
      onScroll,
      onScrollToLower,
      scrollTo,
      scrollToIndex,
      scrollToEnd,
      locale,
      onVisibleItemsChange,
      onResize
    }
  }
})
</script>
