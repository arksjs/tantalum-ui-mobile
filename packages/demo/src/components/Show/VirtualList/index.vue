<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AkVirtualList, ViewPosition } from '@/index'

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
const methodList = ref<InstanceType<typeof AkVirtualList>>()
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
  <ak-group title="Method">
    <ak-virtual-list
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
    </ak-virtual-list>
    <ak-cell
      label="scrollToIndex({ index: 49999 })"
      isLink
      @click="scrollToIndex(49999)"
    ></ak-cell>
    <ak-cell
      label="同上加 viewPosition=0.5"
      isLink
      @click="scrollToIndex(49999, 0.5)"
    ></ak-cell>
    <ak-cell
      label="同上加 viewPosition=1"
      isLink
      @click="scrollToIndex(49999, 1)"
    ></ak-cell>
    <ak-cell
      label="scrollTo({ offset: 200 })"
      isLink
      @click="scrollTo(200)"
    ></ak-cell>
    <ak-cell
      label="scrollToEnd(true)"
      isLink
      @click="scrollToEnd(true)"
    ></ak-cell>
  </ak-group>
</template>
