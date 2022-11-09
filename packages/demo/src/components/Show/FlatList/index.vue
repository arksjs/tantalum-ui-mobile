<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  TaFlatList,
  type FlatListOnEndReached,
  type FlatListOnRefreshing,
  type FlatListOnVisibleItemsChange,
  showToast,
  type ViewPosition
} from '@/index'

interface ExpList {
  id: number
  text: string
}

// 数据初始化
const list = reactive<ExpList[]>([])
const largeList = reactive<ExpList[]>([])
for (let i = 0; i < 100; i++) {
  list.push({
    id: i + 1,
    text: `第 ${i + 1} 个列表`
  })
}
for (let i = 0; i < 100000; i++) {
  largeList.push({
    id: i + 1,
    text: `第 ${i + 1} 个列表`
  })
}

// 瀑布流
function getItemSize(index: number) {
  return 50 + (index % 10) * 2
}

// 下拉刷新
const onRefreshing: FlatListOnRefreshing = (res, done) => {
  setTimeout(() => {
    showToast({
      title: `刷新成功`,
      type: 'success'
    })
    done()
  }, 2000)
}

// 加载更多
const lowerLoading = ref(true)
const loadList = reactive<ExpList[]>([])
function getLoadList() {
  for (let i = loadList.length, len = loadList.length + 10; i < len; i++) {
    loadList.push({
      id: i + 1,
      text: `第 ${i + 1} 个列表`
    })
  }
}
getLoadList()
const onLoadMore: FlatListOnEndReached = res => {
  console.log('end-reached', res)

  const max = 100

  if (loadList.length >= max) {
    return
  }

  setTimeout(() => {
    getLoadList()
    showToast({
      title: `加载成功`,
      type: 'success'
    })

    if (loadList.length >= max) {
      lowerLoading.value = false
    }
  }, 500)
}

// 事件监听
const onVisibleItemsChange: FlatListOnVisibleItemsChange = ({ items }) => {
  console.log('visible-items-change', items)

  items.forEach(({ index, visible }) => {
    index === 49 && showToast(`index: ${index}, visable: ${visible}`)
  })
}
const onEndReached: FlatListOnEndReached = res => {
  console.log('end-reached', res)
  showToast(`到底了`)
}

// 方法调用
const methodList = ref<InstanceType<typeof TaFlatList>>()
function scrollToIndex(index: number, viewPosition: ViewPosition = 0) {
  methodList.value?.scrollToIndex({ index, viewPosition })
}
function scrollTo(offset: number) {
  methodList.value?.scrollTo({ offset })
}
function scrollToEnd(animated: boolean) {
  methodList.value?.scrollToEnd(animated)
}
</script>

<script lang="ts">
export default {
  name: 'ExpFlatList'
}
</script>

<template>
  <ta-group title="基础用法">
    <ta-flat-list class="exp-flatList-box" :ids="list.map(v => v.id)">
      <template #default="{ index }">
        <div class="exp-flatList-item">
          {{ list[index].text }}
        </div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="水平列表">
    <ta-flat-list
      class="exp-flatList-box"
      :ids="list.map(v => v.id)"
      :itemSize="140"
      initialHorizontal
    >
      <template #default="{ index }">
        <div class="exp-flatList-item">
          {{ list[index].text }}
        </div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="开启下拉刷新">
    <ta-flat-list
      class="exp-flatList-box"
      :ids="list.map(v => v.id)"
      :itemSize="50"
      :enablePullRefresh="true"
      @refreshing="onRefreshing"
    >
      <template #default="{ index }">
        <div class="exp-flatList-item">
          {{ list[index].text }}
        </div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="展示底部加载更多提示">
    <ta-flat-list
      class="exp-flatList-box"
      :ids="loadList.map(v => v.id)"
      :lowerLoading="lowerLoading"
      @endReached="onLoadMore"
    >
      <template #default="{ index }">
        <div class="exp-flatList-item">
          {{ list[index].text }}
        </div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="分割线（#separator）">
    <ta-flat-list class="exp-flatList-box" :ids="list.map(v => v.id)">
      <template #default="{ index }">
        <div class="exp-flatList-item">
          {{ list[index].text }}
        </div>
      </template>
      <template #separator="{ index }">
        <div
          class="exp-flatList-item-separator"
          v-if="index < list.length - 1"
        ></div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="瀑布流">
    <ta-flat-list
      class="exp-flatList-box"
      :ids="list.map(v => v.id)"
      :itemSize="getItemSize"
      :initialWaterfallCount="3"
      ref="demo"
    >
      <template #default="{ index }">
        <div class="exp-flatList-item" :class="['color-' + (index % 10)]">
          {{ list[index].text }}
        </div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="事件监听（end-reached/visible-items-change）">
    <ta-flat-list
      class="exp-flatList-box"
      :ids="list.map(v => v.id)"
      :itemSize="50"
      @endReached="onEndReached"
      @visibleItemsChange="onVisibleItemsChange"
    >
      <template #default="{ index }">
        <div class="exp-flatList-item">
          {{ list[index].text }}
        </div>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="Slot empty">
    <ta-flat-list class="exp-flatList-box" :ids="[]" :itemSize="50">
      <template #empty>
        <ta-empty description="暂无列表"></ta-empty>
      </template>
    </ta-flat-list>
  </ta-group>
  <ta-group title="Method">
    <ta-flat-list
      class="exp-flatList-box"
      :ids="largeList.map(v => v.id)"
      :itemSize="50"
      ref="methodList"
    >
      <template #default="{ index }">
        <div class="exp-flatList-item" :class="['color-' + (index % 10)]">
          {{ largeList[index].text }}
        </div>
      </template>
    </ta-flat-list>
    <ta-cell
      label="scrollToIndex({ index: 49999 })"
      isLink
      @click="scrollToIndex(49999)"
    ></ta-cell>
    <ta-cell
      label="同上加 viewPosition=0.5"
      isLink
      @click="scrollToIndex(49999, 0.5)"
    ></ta-cell>
    <ta-cell
      label="同上加 viewPosition=1"
      isLink
      @click="scrollToIndex(49999, 1)"
    ></ta-cell>
    <ta-cell
      label="scrollTo({ offset: 200 })"
      isLink
      @click="scrollTo(200)"
    ></ta-cell>
    <ta-cell
      label="scrollToEnd(true)"
      isLink
      @click="scrollToEnd(true)"
    ></ta-cell>
  </ta-group>
</template>
