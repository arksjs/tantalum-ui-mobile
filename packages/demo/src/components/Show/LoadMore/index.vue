<template>
  <ta-group title="基础用法">
    <ta-load-more></ta-load-more>
  </ta-group>
  <ta-group title="Slot defaut">
    <ta-load-more>暂无数据</ta-load-more>
  </ta-group>
  <ta-group title="loading=true">
    <ta-load-more loading>加载中...</ta-load-more>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpLoadMore'
})
</script>
