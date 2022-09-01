<template>
  <fx-group title="基础用法">
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
  </fx-group>
  <fx-back-top></fx-back-top>
  <fx-back-top :offset="[0, -50]">UP</fx-back-top>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpBackTop'
})
</script>
