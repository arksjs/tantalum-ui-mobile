<template>
  <ta-group title="基础用法">
    <div class="exp-progress-box">
      <ta-progress :percentage="percentage" />
    </div>
    <div class="exp-progress-bottom">
      <ta-stepper :min="0" :max="100" v-model="percentage" />
    </div>
  </ta-group>
  <ta-group title="展示文字">
    <ul class="exp-progress-list">
      <li>
        <ta-progress :percentage="5" show-text />
      </li>
      <li>
        <ta-progress :percentage="50" show-text />
      </li>
      <li>
        <ta-progress :percentage="100" show-text />
      </li>
    </ul>
  </ta-group>
  <ta-group title="固定进度条">
    <ul class="exp-progress-list fixed-bar">
      <li>
        <ta-progress :percentage="5" fixed-bar show-text />
      </li>
      <li>
        <ta-progress :percentage="50" fixed-bar show-text />
      </li>
      <li>
        <ta-progress :percentage="100" fixed-bar show-text />
      </li>
    </ul>
  </ta-group>
  <ta-group title="Slot default">
    <div class="exp-progress-box">
      <ta-progress :percentage="5">
        <template #default="{ progress }"> 已抢{{ progress }} </template>
      </ta-progress>
    </div>
  </ta-group>
  <ta-group title="自定义颜色">
    <div class="exp-progress-box">
      <ta-progress :percentage="50" show-text color="#8b1721" />
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpProgress',
  data() {
    return {
      percentage: 0
    }
  }
})
</script>
