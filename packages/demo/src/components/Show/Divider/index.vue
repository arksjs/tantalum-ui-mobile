<template>
  <ta-group title="基础用法">
    <ta-divider />
  </ta-group>
  <ta-group title="带文本">
    <ta-divider title="文本" />
  </ta-group>
  <ta-group title="虚线">
    <ta-divider title="文本" dashed />
  </ta-group>
  <ta-group title="自定义颜色">
    <ta-divider class="exp-divider-custom-color" title="蓝色" />
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpDivider'
})
</script>
