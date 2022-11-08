<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { showToast, showCalendar, type SelectorModelValue } from '@/index'
import { formatter, parser, template } from '../Calendar/utils'

const simpleValue = ref([new Date()])
const rangeValue = ref([])
const formatValue = ref(dayjs().format(template))

const minDate = dayjs().startOf('day').subtract(1, 'month').toDate()
const maxDate = dayjs().startOf('day').add(1, 'month').toDate()

function onCallApi() {
  showCalendar({
    mode: 'range',
    showClose: true,
    success: res => {
      console.log('success', res)
      if (res.cancel) {
        showToast('取消了')
      } else {
        showToast(`选择了 ${res.detail.label}`)
      }
    }
  })
}

function onChange(res: SelectorModelValue) {
  console.log('change', res)

  showToast('change: ' + (res as any)[0])
}
</script>

<script lang="ts">
export default {
  name: 'ExpCalendar'
}
</script>

<template>
  <ta-group title="initialMode=simple">
    <ta-cell label="默认">
      <ta-calendar v-model="simpleValue" />
    </ta-cell>
    <ta-cell label="showConfirm=true">
      <ta-calendar showConfirm />
    </ta-cell>
    <ta-cell label="showClose=true">
      <ta-calendar showClose />
    </ta-cell>
    <ta-cell label="firstDayOfWeek=1">
      <ta-calendar :firstDayOfWeek="1" />
    </ta-cell>
    <ta-cell label="minDate/maxDate +-1month">
      <ta-calendar :minDate="minDate" :maxDate="maxDate" />
    </ta-cell>
    <ta-cell label="formatter/parser">
      <ta-calendar
        :formatter="formatter"
        :parser="parser"
        v-model="formatValue"
        @change="onChange"
      />
    </ta-cell>
    <ta-cell label="禁用">
      <ta-calendar v-model="simpleValue" disabled />
    </ta-cell>
  </ta-group>
  <ta-group title="initialMode=range">
    <ta-cell label="默认">
      <ta-calendar initialMode="range" v-model="rangeValue" />
    </ta-cell>
    <ta-cell label="allowSameDay">
      <ta-calendar initialMode="range" allowSameDay />
    </ta-cell>
    <ta-cell label="maxRange=5">
      <ta-calendar initialMode="range" :maxRange="5" />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-calendar @change="onChange" />
    </ta-cell>
  </ta-group>
  <ta-group title="API">
    <ta-cell label="showCalendar" isLink @click="onCallApi()" />
  </ta-group>
</template>
