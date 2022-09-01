<script setup lang="ts">
import { ref } from 'vue'
import { showToast, SelectorModelValue } from '@/index'

const dateTimeValue = ref('')
const changeValue = ref('')

function onChange(e: SelectorModelValue) {
  console.log('change', e)
  showToast(`change: ${e}`)
}
</script>

<template>
  <fx-notice-bar
    class="top-notice-bar"
    title="基础展示参数可以参考 DatePicker"
  />
  <fx-group title="initialMode=datetime">
    <fx-date-picker-view initialMode="datetime" v-model="dateTimeValue" />
  </fx-group>
  <fx-group title="change 事件">
    <fx-date-picker-view
      initialMode="date"
      v-model="changeValue"
      @change="onChange"
    />
  </fx-group>
</template>
