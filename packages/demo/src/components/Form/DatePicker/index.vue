<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  showToast,
  showDatePicker,
  DatePickerOptionFilter,
  SelectorModelValue
} from '@/index'

const title = 'DatePicker'

const dateValue = ref('')
const timeValue = ref('')
const dateTimeValue = ref('')
const minMaxValue = ref('')
const formatValue = ref('')
const filterValue = ref('')
const disableValue = ref(new Date())

const minDate = dayjs().startOf('day').subtract(4, 'year').toDate()
const maxDate = dayjs().startOf('day').add(5, 'year').toDate()

const filter: DatePickerOptionFilter = (number, type) => {
  if (type === 'second' && number % 5 !== 0) {
    return false
  }

  return true
}

function onChange(res: SelectorModelValue) {
  console.log('change', res)
  showToast(`值改为 ${res}`)
}

function onCallApi() {
  showDatePicker({
    title,
    success: res => {
      console.log(res)
      if (res.cancel) {
        showToast('取消了')
      } else {
        showToast(`选择了 ${res.detail.label}`)
      }
    }
  })
}
</script>

<template>
  <ak-group title="initialMode">
    <ak-cell label="日期 date">
      <ak-date-picker initialMode="date" v-model="dateValue" />
    </ak-cell>
    <ak-cell label="时间 time">
      <ak-date-picker initialMode="time" v-model="timeValue" />
    </ak-cell>
    <ak-cell label="日期时间 datetime">
      <ak-date-picker initialMode="datetime" v-model="dateTimeValue" />
    </ak-cell>
    <ak-cell label="分秒 minute-second">
      <ak-date-picker initialMode="minute-second" />
    </ak-cell>
    <ak-cell label="时分 hour-minute">
      <ak-date-picker initialMode="hour-minute" />
    </ak-cell>
    <ak-cell label="天时 day-hour">
      <ak-date-picker initialMode="day-hour" />
    </ak-cell>
    <ak-cell label="月日 month-day">
      <ak-date-picker initialMode="month-day" />
    </ak-cell>
    <ak-cell label="月日时 month-day-hour">
      <ak-date-picker initialMode="month-day-hour" />
    </ak-cell>
    <ak-cell label="月日时分 month-day-hour-minute">
      <ak-date-picker initialMode="month-day-hour-minute" />
    </ak-cell>
    <ak-cell label="年月 year-month">
      <ak-date-picker initialMode="year-month" />
    </ak-cell>
    <ak-cell label="年月日时 year-month-day-hour">
      <ak-date-picker initialMode="year-month-day-hour" />
    </ak-cell>
    <ak-cell name="date-picker" label="年月日时分 year-month-day-hour-minute">
      <ak-date-picker initialMode="year-month-day-hour-minute" />
    </ak-cell>
  </ak-group>
  <ak-group title="minDate & maxDate">
    <ak-cell label="-5year ~ 5year">
      <ak-date-picker
        initialMode="date"
        :minDate="maxDate"
        :maxDate="minDate"
        v-model="minMaxValue"
      />
    </ak-cell>
  </ak-group>
  <ak-group title="filter">
    <ak-cell label="秒步进5">
      <ak-date-picker
        initialMode="datetime"
        :filter="filter"
        v-model="filterValue"
      />
    </ak-cell>
  </ak-group>
  <ak-group title="formatTemplate">
    <ak-cell label="YYYY年MM月DD日">
      <ak-date-picker
        initialMode="date"
        formatTemplate="YYYY年MM月DD日"
        v-model="formatValue"
      />
    </ak-cell>
  </ak-group>
  <ak-group title="disabled">
    <ak-cell label="禁用">
      <ak-date-picker initialMode="date" disabled :modelValue="disableValue" />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-date-picker initialMode="datetime" @change="onChange" />
    </ak-cell>
  </ak-group>
  <ak-group title="API">
    <ak-cell label="showDatePicker" isLink @click="onCallApi" />
  </ak-group>
</template>
