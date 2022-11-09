<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  showToast,
  showDatePicker,
  type DatePickerOptionFilter,
  type SelectorModelValue
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

<script lang="ts">
export default {
  name: 'ExpDatePicker'
}
</script>

<template>
  <ta-group title="initialMode">
    <ta-cell label="日期 date">
      <ta-date-picker initialMode="date" v-model="dateValue" />
    </ta-cell>
    <ta-cell label="时间 time">
      <ta-date-picker initialMode="time" v-model="timeValue" />
    </ta-cell>
    <ta-cell label="日期时间 datetime">
      <ta-date-picker initialMode="datetime" v-model="dateTimeValue" />
    </ta-cell>
    <ta-cell label="分秒 minute-second">
      <ta-date-picker initialMode="minute-second" />
    </ta-cell>
    <ta-cell label="时分 hour-minute">
      <ta-date-picker initialMode="hour-minute" />
    </ta-cell>
    <ta-cell label="天时 day-hour">
      <ta-date-picker initialMode="day-hour" />
    </ta-cell>
    <ta-cell label="月日 month-day">
      <ta-date-picker initialMode="month-day" />
    </ta-cell>
    <ta-cell label="月日时 month-day-hour">
      <ta-date-picker initialMode="month-day-hour" />
    </ta-cell>
    <ta-cell label="月日时分 month-day-hour-minute">
      <ta-date-picker initialMode="month-day-hour-minute" />
    </ta-cell>
    <ta-cell label="年月 year-month">
      <ta-date-picker initialMode="year-month" />
    </ta-cell>
    <ta-cell label="年月日时 year-month-day-hour">
      <ta-date-picker initialMode="year-month-day-hour" />
    </ta-cell>
    <ta-cell name="date-picker" label="年月日时分 year-month-day-hour-minute">
      <ta-date-picker initialMode="year-month-day-hour-minute" />
    </ta-cell>
  </ta-group>
  <ta-group title="minDate & maxDate">
    <ta-cell label="-5year ~ 5year">
      <ta-date-picker
        initialMode="date"
        :minDate="maxDate"
        :maxDate="minDate"
        v-model="minMaxValue"
      />
    </ta-cell>
  </ta-group>
  <ta-group title="filter">
    <ta-cell label="秒步进5">
      <ta-date-picker
        initialMode="datetime"
        :filter="filter"
        v-model="filterValue"
      />
    </ta-cell>
  </ta-group>
  <ta-group title="formatTemplate">
    <ta-cell label="YYYY年MM月DD日">
      <ta-date-picker
        initialMode="date"
        formatTemplate="YYYY年MM月DD日"
        v-model="formatValue"
      />
    </ta-cell>
  </ta-group>
  <ta-group title="disabled">
    <ta-cell label="禁用">
      <ta-date-picker initialMode="date" disabled :modelValue="disableValue" />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-date-picker initialMode="datetime" @change="onChange" />
    </ta-cell>
  </ta-group>
  <ta-group title="API">
    <ta-cell label="showDatePicker" isLink @click="onCallApi" />
  </ta-group>
</template>
