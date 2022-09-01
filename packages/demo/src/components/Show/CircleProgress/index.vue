<template>
  <fx-group title="基础用法">
    <div class="exp-circleProgress-box">
      <fx-circle-progress :percentage="percentage" />
      <fx-stepper :min="0" :max="100" v-model="percentage" />
    </div>
  </fx-group>
  <fx-group title="参数设置">
    <ul class="exp-circleProgress-list">
      <li>
        <fx-circle-progress :percentage="percentage" color="#ff4d4f">
          color
        </fx-circle-progress>
      </li>
      <li>
        <fx-circle-progress :percentage="percentage" :strokeWidth="2">
          strokeWidth
        </fx-circle-progress>
      </li>
      <li>
        <fx-circle-progress :percentage="percentage" :size="80">
          size
        </fx-circle-progress>
      </li>
    </ul>
  </fx-group>
  <fx-group title="Slot default">
    <div class="exp-circleProgress-box">
      <fx-circle-progress :percentage="percentage">
        <template #default="{ progress }"> 已抢{{ progress }} </template>
      </fx-circle-progress>
    </div>
  </fx-group>
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
