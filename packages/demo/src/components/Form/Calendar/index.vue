<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import { showToast, showCalendar, SelectorModelValue } from '@/index'
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

<template>
  <ak-group title="initialMode=simple">
    <ak-cell label="默认">
      <ak-calendar v-model="simpleValue" />
    </ak-cell>
    <ak-cell label="showConfirm=true">
      <ak-calendar showConfirm />
    </ak-cell>
    <ak-cell label="showClose=true">
      <ak-calendar showClose />
    </ak-cell>
    <ak-cell label="firstDayOfWeek=1">
      <ak-calendar :firstDayOfWeek="1" />
    </ak-cell>
    <ak-cell label="minDate/maxDate +-1month">
      <ak-calendar :minDate="minDate" :maxDate="maxDate" />
    </ak-cell>
    <ak-cell label="formatter/parser">
      <ak-calendar
        :formatter="formatter"
        :parser="parser"
        v-model="formatValue"
        @change="onChange"
      />
    </ak-cell>
    <ak-cell label="禁用">
      <ak-calendar v-model="simpleValue" disabled />
    </ak-cell>
  </ak-group>
  <ak-group title="initialMode=range">
    <ak-cell label="默认">
      <ak-calendar initialMode="range" v-model="rangeValue" />
    </ak-cell>
    <ak-cell label="allowSameDay">
      <ak-calendar initialMode="range" allowSameDay />
    </ak-cell>
    <ak-cell label="maxRange=5">
      <ak-calendar initialMode="range" :maxRange="5" />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-calendar @change="onChange" />
    </ak-cell>
  </ak-group>
  <ak-group title="API">
    <ak-cell label="showCalendar" isLink @click="onCallApi()" />
  </ak-group>
</template>
