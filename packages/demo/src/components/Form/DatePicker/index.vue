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
  <fx-group title="initialMode">
    <fx-cell label="日期 date">
      <fx-date-picker initialMode="date" v-model="dateValue" />
    </fx-cell>
    <fx-cell label="时间 time">
      <fx-date-picker initialMode="time" v-model="timeValue" />
    </fx-cell>
    <fx-cell label="日期时间 datetime">
      <fx-date-picker initialMode="datetime" v-model="dateTimeValue" />
    </fx-cell>
    <fx-cell label="分秒 minute-second">
      <fx-date-picker initialMode="minute-second" />
    </fx-cell>
    <fx-cell label="时分 hour-minute">
      <fx-date-picker initialMode="hour-minute" />
    </fx-cell>
    <fx-cell label="天时 day-hour">
      <fx-date-picker initialMode="day-hour" />
    </fx-cell>
    <fx-cell label="月日 month-day">
      <fx-date-picker initialMode="month-day" />
    </fx-cell>
    <fx-cell label="月日时 month-day-hour">
      <fx-date-picker initialMode="month-day-hour" />
    </fx-cell>
    <fx-cell label="月日时分 month-day-hour-minute">
      <fx-date-picker initialMode="month-day-hour-minute" />
    </fx-cell>
    <fx-cell label="年月 year-month">
      <fx-date-picker initialMode="year-month" />
    </fx-cell>
    <fx-cell label="年月日时 year-month-day-hour">
      <fx-date-picker initialMode="year-month-day-hour" />
    </fx-cell>
    <fx-cell name="date-picker" label="年月日时分 year-month-day-hour-minute">
      <fx-date-picker initialMode="year-month-day-hour-minute" />
    </fx-cell>
  </fx-group>
  <fx-group title="minDate & maxDate">
    <fx-cell label="-5year ~ 5year">
      <fx-date-picker
        initialMode="date"
        :minDate="maxDate"
        :maxDate="minDate"
        v-model="minMaxValue"
      />
    </fx-cell>
  </fx-group>
  <fx-group title="filter">
    <fx-cell label="秒步进5">
      <fx-date-picker
        initialMode="datetime"
        :filter="filter"
        v-model="filterValue"
      />
    </fx-cell>
  </fx-group>
  <fx-group title="formatTemplate">
    <fx-cell label="YYYY年MM月DD日">
      <fx-date-picker
        initialMode="date"
        formatTemplate="YYYY年MM月DD日"
        v-model="formatValue"
      />
    </fx-cell>
  </fx-group>
  <fx-group title="disabled">
    <fx-cell label="禁用">
      <fx-date-picker initialMode="date" disabled :modelValue="disableValue" />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change">
      <fx-date-picker initialMode="datetime" @change="onChange" />
    </fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showDatePicker" isLink @click="onCallApi" />
  </fx-group>
</template>
