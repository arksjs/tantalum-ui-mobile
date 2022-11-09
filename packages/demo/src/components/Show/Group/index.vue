<template>
  <ta-group title="基础风格">
    <ta-cell
      label="单元格"
      content="内容"
      description="网站大概部分组件都由这个组件进行分组"
    ></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
  </ta-group>
  <ta-group title="基础风格">
    <template #header> 右侧文案 </template>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
  </ta-group>
  <ta-group title="强化标题栏" :strongHeader="strongHeader">
    <template #header>
      <ta-button size="small"> 查看更多 </ta-button>
    </template>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
    <ta-cell label="单元格" content="内容"></ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpGroup',
  data() {
    return {
      strongHeader: true
    }
  }
})
</script>
