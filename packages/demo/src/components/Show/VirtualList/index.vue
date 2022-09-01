<script setup lang="ts">
import { reactive, ref } from 'vue'
import { VirtualList, ViewPosition } from '@/index'

interface ExpList {
  id: number
  text: string
}

// 数据初始化
const largeList = reactive<ExpList[]>([])
for (let i = 0; i < 100000; i++) {
  largeList.push({
    id: i + 1,
    text: `第 ${i + 1} 个列表`
  })
}

// 方法调用
const methodList = ref<InstanceType<typeof VirtualList>>()
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

<template>
  <fx-group title="Method">
    <fx-virtual-list
      class="exp-flatList-box"
      :ids="largeList.map(v => v.id)"
      ref="methodList"
      :itemSize="50"
    >
      <template #default="{ index }">
        <div class="exp-flatList-item" :class="['color-' + (index % 10)]">
          {{ largeList[index].text }}
        </div>
      </template>
    </fx-virtual-list>
    <fx-cell
      label="scrollToIndex({ index: 49999 })"
      isLink
      @click="scrollToIndex(49999)"
    ></fx-cell>
    <fx-cell
      label="同上加 viewPosition=0.5"
      isLink
      @click="scrollToIndex(49999, 0.5)"
    ></fx-cell>
    <fx-cell
      label="同上加 viewPosition=1"
      isLink
      @click="scrollToIndex(49999, 1)"
    ></fx-cell>
    <fx-cell
      label="scrollTo({ offset: 200 })"
      isLink
      @click="scrollTo(200)"
    ></fx-cell>
    <fx-cell
      label="scrollToEnd(true)"
      isLink
      @click="scrollToEnd(true)"
    ></fx-cell>
  </fx-group>
</template>
