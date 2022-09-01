<template>
  <fx-group title="基础用法">
    <div class="exp-progress-box">
      <fx-progress :percentage="percentage" />
    </div>
    <div class="exp-progress-bottom">
      <fx-stepper :min="0" :max="100" v-model="percentage" />
    </div>
  </fx-group>
  <fx-group title="展示文字">
    <ul class="exp-progress-list">
      <li>
        <fx-progress :percentage="5" show-text />
      </li>
      <li>
        <fx-progress :percentage="50" show-text />
      </li>
      <li>
        <fx-progress :percentage="100" show-text />
      </li>
    </ul>
  </fx-group>
  <fx-group title="固定进度条">
    <ul class="exp-progress-list fixed-bar">
      <li>
        <fx-progress :percentage="5" fixed-bar show-text />
      </li>
      <li>
        <fx-progress :percentage="50" fixed-bar show-text />
      </li>
      <li>
        <fx-progress :percentage="100" fixed-bar show-text />
      </li>
    </ul>
  </fx-group>
  <fx-group title="Slot default">
    <div class="exp-progress-box">
      <fx-progress :percentage="5">
        <template #default="{ progress }"> 已抢{{ progress }} </template>
      </fx-progress>
    </div>
  </fx-group>
  <fx-group title="自定义颜色">
    <div class="exp-progress-box">
      <fx-progress :percentage="50" show-text color="#8b1721" />
    </div>
  </fx-group>
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
