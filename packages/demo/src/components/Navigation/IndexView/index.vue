<template>
  <ta-group title="基础用法">
    <!-- <div class="scroll-tab-header">占位头部</div> -->
    <ta-index-view
      v-model="value"
      ref="indexViewRef"
      :stickyOffsetTop="offsetTop"
      @change="onChange"
    >
      <ta-index-view-item :name="item" v-for="item in indexList" :key="item">
        <ta-cell label="单元格"></ta-cell>
        <ta-cell label="单元格"></ta-cell>
        <ta-cell label="单元格"></ta-cell>
        <ta-cell label="单元格"></ta-cell>
        <ta-cell label="单元格"></ta-cell>
      </ta-index-view-item>
    </ta-index-view>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { IndexViewOnChange, IndexViewRef } from '@/index'

export default defineComponent({
  name: 'ExpIndexView',
  setup() {
    const value = ref()
    const indexViewRef = ref<IndexViewRef | null>(null)

    const onChange: IndexViewOnChange = res => {
      console.log('change', res)
    }

    onMounted(() => {
      // indexViewRef.value?.scrollToIndex(2)
    })

    return {
      value,
      indexViewRef,

      offsetTop: 52,
      indexList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),

      onChange
    }
  }
})
</script>
