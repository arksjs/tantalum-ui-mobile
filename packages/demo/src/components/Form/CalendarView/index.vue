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
  <fx-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Calendar" />
  <fx-group title="initialMode=single">
    <fx-cell label="v-model"> {{ viewValue }} </fx-cell>
    <fx-calendar-view
      v-model="viewValue"
      :formatter="formatter"
      :parser="parser"
    />
  </fx-group>
  <fx-group title="initialMode=range">
    <fx-cell label="v-model"> {{ viewRangeValue }} </fx-cell>
    <fx-calendar-view
      initialMode="range"
      v-model="viewRangeValue"
      :formatter="formatter"
      :parser="parser"
    />
  </fx-group>
  <fx-group title="select 事件">
    <fx-calendar-view @select="onSelect" />
  </fx-group>
</template>
