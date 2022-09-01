<template>
  <fx-group title="基础用法">
    <!-- <div class="scroll-tab-header">占位头部</div> -->
    <fx-index-view :stickyOffsetTop="offsetTop" @change="onChange">
      <fx-index-view-item :name="item" v-for="item in indexList" :key="item">
        <fx-cell label="单元格"></fx-cell>
        <fx-cell label="单元格"></fx-cell>
        <fx-cell label="单元格"></fx-cell>
        <fx-cell label="单元格"></fx-cell>
        <fx-cell label="单元格"></fx-cell>
      </fx-index-view-item>
    </fx-index-view>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IndexViewOnChange } from '@/index'

export default defineComponent({
  name: 'ExpIndexView',
  setup() {
    const onChange: IndexViewOnChange = res => {
      console.log('change', res)
    }

    return {
      offsetTop: 52,
      indexList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),

      onChange
    }
  }
})
</script>
