<script setup lang="ts">
import { ref } from 'vue'
import { type CalendarOnSelect, showToast } from '@/index'
import { formatter, parser } from '../Calendar/utils'

const viewValue = ref('')
const viewRangeValue = ref('')

const onSelect: CalendarOnSelect = res => {
  console.log('select', res)

  showToast(`选择：${res.label}`)
}
</script>

<script lang="ts">
export default {
  name: 'ExpCalendarView'
}
</script>

<template>
  <ta-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Calendar" />
  <ta-group title="initialMode=single">
    <ta-cell label="v-model"> {{ viewValue }} </ta-cell>
    <ta-calendar-view v-model="viewValue" :formatter="formatter" :parser="parser" />
  </ta-group>
  <ta-group title="initialMode=range">
    <ta-cell label="v-model"> {{ viewRangeValue }} </ta-cell>
    <ta-calendar-view
      initialMode="range"
      v-model="viewRangeValue"
      :formatter="formatter"
      :parser="parser"
    />
  </ta-group>
  <ta-group title="select 事件">
    <ta-calendar-view @select="onSelect" />
  </ta-group>
</template>
