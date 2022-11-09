<template>
  <ta-group title="基础用法">
    <div class="exp-activityIndicator-box">
      <ta-activity-indicator />
    </div>
  </ta-group>
  <ta-group title="颜色 color=#ff4d4f">
    <div class="exp-activityIndicator-box">
      <ta-activity-indicator color="#ff4d4f" />
    </div>
  </ta-group>
  <ta-group title="大小 size=48">
    <div class="exp-activityIndicator-box">
      <ta-activity-indicator :size="48" />
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpActivityIndicator'
})
</script>
