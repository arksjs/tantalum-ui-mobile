<template>
  <fx-group title="基础用法">
    <fx-divider />
  </fx-group>
  <fx-group title="带文本">
    <fx-divider title="文本" />
  </fx-group>
  <fx-group title="虚线">
    <fx-divider title="文本" dashed />
  </fx-group>
  <fx-group title="自定义颜色">
    <fx-divider class="exp-divider-custom-color" title="蓝色" />
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpDivider'
})
</script>
