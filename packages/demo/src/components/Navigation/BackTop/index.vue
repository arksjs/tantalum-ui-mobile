<template>
  <ta-group title="基础用法">
    <ul class="exp-backTop-box">
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
      <li>Scroll to bottom 往下滑</li>
    </ul>
  </ta-group>
  <ta-back-top></ta-back-top>
  <ta-back-top :offset="[0, -50]">UP</ta-back-top>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpBackTop'
})
</script>
