<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import {
  showToast,
  CalendarOnConfirm,
  PopupOnVisibleStateChange,
  PopupOnCancel,
  SelectorModelValue
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

<template>
  <fx-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Calendar" />
  <fx-group title="基础用法">
    <fx-cell
      label="默认"
      @click="
        () => {
          popupVisible = true
        }
      "
      >{{ popupValue }}</fx-cell
    >
    <fx-cell label="+1day" isLink @click="addOneDay">click</fx-cell>
    <fx-cell
      label="showConfirm=true"
      isLink
      @click="
        () => {
          popupShowConfirm = true
          popupVisible = true
        }
      "
    />
    <fx-cell
      label="initialMode=range"
      isLink
      @click="popupRangeVisible = true"
    />
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell
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
    <fx-cell
      label="visible-state-change"
      isLink
      @click="
        () => {
          visibleEvent = true
          popupVisible = true
        }
      "
    />
  </fx-group>
  <fx-calendar-popup
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
  <fx-calendar-popup
    v-model:visible="popupRangeVisible"
    :title="title"
    initialMode="range"
    v-model="popupRangeValue"
    @confirm="onRangeConfirm"
  />
</template>
