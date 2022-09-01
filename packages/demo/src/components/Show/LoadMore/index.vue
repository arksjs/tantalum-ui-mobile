<template>
  <fx-group title="基础用法">
    <fx-load-more></fx-load-more>
  </fx-group>
  <fx-group title="Slot defaut">
    <fx-load-more>暂无数据</fx-load-more>
  </fx-group>
  <fx-group title="loading=true">
    <fx-load-more loading>加载中...</fx-load-more>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpLoadMore'
})
</script>
