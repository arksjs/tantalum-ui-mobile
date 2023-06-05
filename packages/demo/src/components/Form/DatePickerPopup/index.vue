<script setup lang="ts">
import { ref } from 'vue'
import {
  showToast,
  type SelectorModelValue,
  type DatePickerOnConfirm,
  type PopupOnVisibleStateChange,
  type PopupOnCancel
} from '@/index'

const popupValue = ref('')
const visible = ref(false)
const clickEvent = ref(false)
const changeEvent = ref(false)
const visibleEvent = ref(false)

const onVisibleStateChange: PopupOnVisibleStateChange = res => {
  if (visibleEvent.value) {
    console.log('visible-state-change', res)
    showToast(`${res.state} 事件触发`)
  }

  if (res.state === 'hidden') {
    clickEvent.value = false
    visibleEvent.value = false
    changeEvent.value = false
  }
}

function onChange(res: SelectorModelValue) {
  if (changeEvent.value) {
    console.log('change', res)
    showToast(`值改为 ${res}`)
  }
}

const onConfirm: DatePickerOnConfirm = res => {
  if (clickEvent.value) {
    console.log('confirm', res)
    showToast(`点击确定按钮`)
  }
}

const onCancel: PopupOnCancel = res => {
  if (clickEvent.value) {
    console.log('cancel', res)

    if (res.source === 'cancelClick') {
      showToast('点击了取消按钮')
    } else if (res.source === 'maskClick') {
      showToast('点击了蒙层')
    }
  }
}
</script>

<script lang="ts">
export default {
  name: 'ExpDatePickerPopup'
}
</script>

<template>
  <ta-notice-bar class="top-notice-bar" title="基础展示参数可以参考 DatePicker" />
  <ta-group title="基础用法">
    <ta-cell label="默认" isLink @click="visible = true" :content="popupValue" />
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell
      label="change"
      isLink
      @click="
        () => {
          changeEvent = true
          visible = true
        }
      "
    />
    <ta-cell
      label="confirm/cancel"
      isLink
      @click="
        () => {
          clickEvent = true
          visible = true
        }
      "
    />
    <ta-cell
      label="visible-state-change"
      isLink
      @click="
        () => {
          visibleEvent = true
          visible = true
        }
      "
    />
  </ta-group>
  <ta-date-picker-popup
    initialMode="date"
    formatTemplate="YYYY年MM月DD日"
    v-model:visible="visible"
    title="DatePickerPopup"
    v-model="popupValue"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @visibleStateChange="onVisibleStateChange"
  />
</template>
