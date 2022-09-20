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
  <ak-notice-bar
    class="top-notice-bar"
    title="基础展示参数可以参考 DatePicker"
  />
  <ak-group title="initialMode=datetime">
    <ak-date-picker-view initialMode="datetime" v-model="dateTimeValue" />
  </ak-group>
  <ak-group title="change 事件">
    <ak-date-picker-view
      initialMode="date"
      v-model="changeValue"
      @change="onChange"
    />
  </ak-group>
</template>
