<script setup lang="ts">
import { ref } from 'vue'
import { multiOptions } from '../Picker/data'
import {
  showToast,
  type SelectorModelValue,
  type PickerOnConfirm,
  type PopupOnVisibleStateChange,
  type PopupOnCancel
} from '@/index'

const popupValue = ref([2000, '夏'])
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

const onConfirm: PickerOnConfirm = res => {
  if (clickEvent.value) {
    console.log('confirm', res)
    showToast(`点击确定按钮`)
  }
}

function onChange(res: SelectorModelValue) {
  if (changeEvent.value) {
    console.log('change', res)
    showToast(`值改为 ${res}`)
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
  name: 'ExpPickerPopup'
}
</script>

<template>
  <ak-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Picker" />
  <ak-group title="基础用法">
    <ak-cell label="v-model" isLink @click="visible = true">{{
      popupValue
    }}</ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell
      label="change"
      isLink
      @click="
        () => {
          changeEvent = true
          visible = true
        }
      "
    />
    <ak-cell
      label="confirm/cancel"
      isLink
      @click="
        () => {
          clickEvent = true
          visible = true
        }
      "
    />
    <ak-cell
      label="visible-state-change"
      isLink
      @click="
        () => {
          visibleEvent = true
          visible = true
        }
      "
    />
  </ak-group>
  <ak-picker-popup
    v-model:visible="visible"
    title="PickerPopup"
    :options="multiOptions"
    v-model="popupValue"
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @visibleStateChange="onVisibleStateChange"
  />
</template>
