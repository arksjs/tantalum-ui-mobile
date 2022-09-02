<template>
  <ak-group title="基础用法">
    <div class="exp-activityIndicator-box">
      <ak-activity-indicator />
    </div>
  </ak-group>
  <ak-group title="颜色 color=#ff4d4f">
    <div class="exp-activityIndicator-box">
      <ak-activity-indicator color="#ff4d4f" />
    </div>
  </ak-group>
  <ak-group title="大小 size=48">
    <div class="exp-activityIndicator-box">
      <ak-activity-indicator :size="48" />
    </div>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpActivityIndicator'
})
</script>
