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
  <fx-group title="initialMode=simple">
    <fx-cell label="默认">
      <fx-calendar v-model="simpleValue" />
    </fx-cell>
    <fx-cell label="showConfirm=true">
      <fx-calendar showConfirm />
    </fx-cell>
    <fx-cell label="showClose=true">
      <fx-calendar showClose />
    </fx-cell>
    <fx-cell label="firstDayOfWeek=1">
      <fx-calendar :firstDayOfWeek="1" />
    </fx-cell>
    <fx-cell label="minDate/maxDate +-1month">
      <fx-calendar :minDate="minDate" :maxDate="maxDate" />
    </fx-cell>
    <fx-cell label="formatter/parser">
      <fx-calendar
        :formatter="formatter"
        :parser="parser"
        v-model="formatValue"
        @change="onChange"
      />
    </fx-cell>
    <fx-cell label="禁用">
      <fx-calendar v-model="simpleValue" disabled />
    </fx-cell>
  </fx-group>
  <fx-group title="initialMode=range">
    <fx-cell label="默认">
      <fx-calendar initialMode="range" v-model="rangeValue" />
    </fx-cell>
    <fx-cell label="allowSameDay">
      <fx-calendar initialMode="range" allowSameDay />
    </fx-cell>
    <fx-cell label="maxRange=5">
      <fx-calendar initialMode="range" :maxRange="5" />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change">
      <fx-calendar @change="onChange" />
    </fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showCalendar" isLink @click="onCallApi()" />
  </fx-group>
</template>
