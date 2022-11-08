<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  showToast,
  type CalendarOnConfirm,
  type PopupOnVisibleStateChange,
  type PopupOnCancel,
  type SelectorModelValue
} from '@/index'
import { formatter, parser, template } from '../Calendar/utils'

const popupValue = ref(dayjs().format(template))
const popupRangeValue = ref([])

const popupVisible = ref(false)
const popupRangeVisible = ref(false)
const popupShowConfirm = ref(false)
const popupShowClose = ref(false)
const confirmEvent = ref(false)
const visibleEvent = ref(false)

const title = 'CalendarPopup'

const onVisibleStateChange: PopupOnVisibleStateChange = res => {
  if (visibleEvent.value) {
    console.log('change', res)
    showToast(`${res.state} 事件触发`)
  }

  if (res.state === 'hidden') {
    visibleEvent.value = false
    confirmEvent.value = false
    popupShowConfirm.value = false
    popupShowClose.value = false
  }
}

const onCancel: PopupOnCancel = res => {
  console.log('cancel', res)
  if (confirmEvent.value) {
    showToast(`触发了取消事件`)
  }
}

const onConfirm: CalendarOnConfirm = res => {
  console.log('confirm', res)
  if (confirmEvent.value) {
    showToast(`触发了确定事件`)
  }
}

function onChange(res: SelectorModelValue) {
  console.log('change', res)

  // showToast(`change: ${res}`)
}

const onRangeConfirm: CalendarOnConfirm = res => {
  console.log('confirm', res)
}

function addOneDay() {
  popupValue.value = dayjs(popupValue.value, template, true)
    .add(1, 'day')
    .format(template)
}
</script>

<script lang="ts">
export default {
  name: 'ExpCalendarPopup'
}
</script>

<template>
  <ta-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Calendar" />
  <ta-group title="基础用法">
    <ta-cell
      label="默认"
      @click="
        () => {
          popupVisible = true
        }
      "
      >{{ popupValue }}</ta-cell
    >
    <ta-cell label="+1day" isLink @click="addOneDay">click</ta-cell>
    <ta-cell
      label="showConfirm=true"
      isLink
      @click="
        () => {
          popupShowConfirm = true
          popupVisible = true
        }
      "
    />
    <ta-cell
      label="initialMode=range"
      isLink
      @click="popupRangeVisible = true"
    />
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell
      label="confirm/cancel"
      isLink
      @click="
        () => {
          confirmEvent = true
          popupVisible = true
          popupShowClose = true
        }
      "
    />
    <ta-cell
      label="visible-state-change"
      isLink
      @click="
        () => {
          visibleEvent = true
          popupVisible = true
        }
      "
    />
  </ta-group>
  <ta-calendar-popup
    v-model:visible="popupVisible"
    :title="title"
    :showConfirm="popupShowConfirm"
    :showClose="popupShowClose"
    v-model="popupValue"
    :formatter="formatter"
    :parser="parser"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
    @visibleStateChange="onVisibleStateChange"
  />
  <ta-calendar-popup
    v-model:visible="popupRangeVisible"
    :title="title"
    initialMode="range"
    v-model="popupRangeValue"
    @confirm="onRangeConfirm"
  />
</template>
