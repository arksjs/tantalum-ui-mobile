<template>
  <fx-group title="基础用法">
    <div class="exp-activityIndicator-box">
      <fx-activity-indicator />
    </div>
  </fx-group>
  <fx-group title="颜色 color=#ff4d4f">
    <div class="exp-activityIndicator-box">
      <fx-activity-indicator color="#ff4d4f" />
    </div>
  </fx-group>
  <fx-group title="大小 size=48">
    <div class="exp-activityIndicator-box">
      <fx-activity-indicator :size="48" />
    </div>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExpActivityIndicator'
})
</script>
