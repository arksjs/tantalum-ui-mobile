<template>
  <ak-group title="基础用法">
    <div class="exp-circleProgress-box">
      <ak-circle-progress :percentage="percentage" />
      <ak-stepper :min="0" :max="100" v-model="percentage" />
    </div>
  </ak-group>
  <ak-group title="参数设置">
    <ul class="exp-circleProgress-list">
      <li>
        <ak-circle-progress :percentage="percentage" color="#ff4d4f">
          color
        </ak-circle-progress>
      </li>
      <li>
        <ak-circle-progress :percentage="percentage" :strokeWidth="2">
          strokeWidth
        </ak-circle-progress>
      </li>
      <li>
        <ak-circle-progress :percentage="percentage" :size="80">
          size
        </ak-circle-progress>
      </li>
    </ul>
  </ak-group>
  <ak-group title="Slot default">
    <div class="exp-circleProgress-box">
      <ak-circle-progress :percentage="percentage">
        <template #default="{ progress }"> 已抢{{ progress }} </template>
      </ak-circle-progress>
    </div>
  </ak-group>
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
