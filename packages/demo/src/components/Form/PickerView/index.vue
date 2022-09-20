<script setup lang="ts">
import { ref } from 'vue'
import { showToast, type SelectorModelValue } from '@/index'
import { cascadeOptions, multiOptions, options } from '../Picker/data'

const colValue = ref([2001])
const multiValue = ref([])
const cascadeValue = ref([])
const changeValue = ref([])

function onChange(res: SelectorModelValue) {
  console.log('change', res)
}

function onChangeEvent(res: SelectorModelValue) {
  onChange(res)

  showToast(`change: ${res}`)
}
</script>

<script lang="ts">
export default {
  name: 'ExpPickerView'
}
</script>

<template>
  <ak-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Picker" />
  <ak-group title="单列">
    <ak-picker-view
      :options="options"
      @change="onChange"
      v-model="colValue"
    ></ak-picker-view>
  </ak-group>
  <ak-group title="多列">
    <ak-picker-view
      :options="multiOptions"
      @change="onChange"
      v-model="multiValue"
    ></ak-picker-view>
  </ak-group>
  <ak-group title="级联">
    <ak-picker-view
      :options="cascadeOptions"
      @change="onChange"
      v-model="cascadeValue"
    ></ak-picker-view>
  </ak-group>
  <ak-group title="change 事件">
    <ak-picker-view
      :options="multiOptions"
      @change="onChangeEvent"
      v-model="changeValue"
    ></ak-picker-view>
  </ak-group>
</template>
