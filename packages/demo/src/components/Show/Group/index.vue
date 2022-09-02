<template>
  <ak-group title="基础风格">
    <ak-cell
      label="单元格"
      content="内容"
      description="网站大概部分组件都由这个组件进行分组"
    ></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
  </ak-group>
  <ak-group title="基础风格">
    <template #header> 右侧文案 </template>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
  </ak-group>
  <ak-group title="强化标题栏" :strongHeader="strongHeader">
    <template #header>
      <ak-button size="small"> 查看更多 </ak-button>
    </template>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
    <ak-cell label="单元格" content="内容"></ak-cell>
  </ak-group>
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
