<template>
  <ak-group title="基础用法">
    <ak-divider />
  </ak-group>
  <ak-group title="带文本">
    <ak-divider title="文本" />
  </ak-group>
  <ak-group title="虚线">
    <ak-divider title="文本" dashed />
  </ak-group>
  <ak-group title="自定义颜色">
    <ak-divider class="exp-divider-custom-color" title="蓝色" />
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpDivider'
})
</script>
