<script setup lang="ts">
import { ref } from 'vue'
import { CalendarOnSelect, showToast } from '@/index'
import { formatter, parser } from '../Calendar/utils'

const viewValue = ref('')
const viewRangeValue = ref('')

const onSelect: CalendarOnSelect = res => {
  console.log('select', res)

  showToast(`选择：${res.label}`)
}
</script>

<template>
  <ak-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Calendar" />
  <ak-group title="initialMode=single">
    <ak-cell label="v-model"> {{ viewValue }} </ak-cell>
    <ak-calendar-view
      v-model="viewValue"
      :formatter="formatter"
      :parser="parser"
    />
  </ak-group>
  <ak-group title="initialMode=range">
    <ak-cell label="v-model"> {{ viewRangeValue }} </ak-cell>
    <ak-calendar-view
      initialMode="range"
      v-model="viewRangeValue"
      :formatter="formatter"
      :parser="parser"
    />
  </ak-group>
  <ak-group title="select 事件">
    <ak-calendar-view @select="onSelect" />
  </ak-group>
</template>
