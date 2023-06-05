<template>
  <ta-group title="基础用法">
    <div class="exp-circleProgress-box">
      <ta-circle-progress :percentage="percentage" />
      <ta-stepper :min="0" :max="100" v-model="percentage" />
    </div>
  </ta-group>
  <ta-group title="参数设置">
    <ul class="exp-circleProgress-list">
      <li>
        <ta-circle-progress :percentage="percentage" color="#ff4d4f"> color </ta-circle-progress>
      </li>
      <li>
        <ta-circle-progress :percentage="percentage" :strokeWidth="2">
          strokeWidth
        </ta-circle-progress>
      </li>
      <li>
        <ta-circle-progress :percentage="percentage" :size="80"> size </ta-circle-progress>
      </li>
    </ul>
  </ta-group>
  <ta-group title="Slot default">
    <div class="exp-circleProgress-box">
      <ta-circle-progress :percentage="percentage">
        <template #default="{ progress }"> 已抢{{ progress }} </template>
      </ta-circle-progress>
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ExpCircleProgress',
  setup() {
    return {
      percentage: ref(50)
    }
  }
})
</script>
