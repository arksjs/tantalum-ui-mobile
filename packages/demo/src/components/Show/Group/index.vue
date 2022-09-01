<template>
  <fx-group title="基础风格">
    <fx-cell
      label="单元格"
      content="内容"
      description="网站大概部分组件都由这个组件进行分组"
    ></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
  </fx-group>
  <fx-group title="基础风格">
    <template #header> 右侧文案 </template>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
  </fx-group>
  <fx-group title="强化标题栏" :strongHeader="strongHeader">
    <template #header>
      <fx-button size="small"> 查看更多 </fx-button>
    </template>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
    <fx-cell label="单元格" content="内容"></fx-cell>
  </fx-group>
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
