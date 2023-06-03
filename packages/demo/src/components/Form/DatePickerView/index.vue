<script setup lang="ts">
import { ref } from 'vue'
import { showToast, type SelectorModelValue } from '@/index'

const dateTimeValue = ref('')
const changeValue = ref('')

function onChange(e: SelectorModelValue) {
  console.log('change', e)
  showToast(`change: ${e}`)
}
</script>

<script lang="ts">
export default {
  name: 'ExpDatePickerView'
}
</script>

<template>
  <ta-notice-bar class="top-notice-bar" title="基础展示参数可以参考 DatePicker" />
  <ta-group title="initialMode=datetime">
    <ta-date-picker-view initialMode="datetime" v-model="dateTimeValue" />
  </ta-group>
  <ta-group title="change 事件">
    <ta-date-picker-view initialMode="date" v-model="changeValue" @change="onChange" />
  </ta-group>
</template>
