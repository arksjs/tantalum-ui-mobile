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
  <ta-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Picker" />
  <ta-group title="单列">
    <ta-picker-view
      :options="options"
      @change="onChange"
      v-model="colValue"
    ></ta-picker-view>
  </ta-group>
  <ta-group title="多列">
    <ta-picker-view
      :options="multiOptions"
      @change="onChange"
      v-model="multiValue"
    ></ta-picker-view>
  </ta-group>
  <ta-group title="级联">
    <ta-picker-view
      :options="cascadeOptions"
      @change="onChange"
      v-model="cascadeValue"
    ></ta-picker-view>
  </ta-group>
  <ta-group title="change 事件">
    <ta-picker-view
      :options="multiOptions"
      @change="onChangeEvent"
      v-model="changeValue"
    ></ta-picker-view>
  </ta-group>
</template>
