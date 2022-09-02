<template>
  <ak-group title="基础用法">
    <ak-load-more></ak-load-more>
  </ak-group>
  <ak-group title="Slot defaut">
    <ak-load-more>暂无数据</ak-load-more>
  </ak-group>
  <ak-group title="loading=true">
    <ak-load-more loading>加载中...</ak-load-more>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpLoadMore'
})
</script>
