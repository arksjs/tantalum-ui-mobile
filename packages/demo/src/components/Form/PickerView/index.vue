<script setup lang="ts">
import { ref } from 'vue'
import { showToast, SelectorModelValue } from '@/index'
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

<template>
  <fx-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Picker" />
  <fx-group title="单列">
    <fx-picker-view
      :options="options"
      @change="onChange"
      v-model="colValue"
    ></fx-picker-view>
  </fx-group>
  <fx-group title="多列">
    <fx-picker-view
      :options="multiOptions"
      @change="onChange"
      v-model="multiValue"
    ></fx-picker-view>
  </fx-group>
  <fx-group title="级联">
    <fx-picker-view
      :options="cascadeOptions"
      @change="onChange"
      v-model="cascadeValue"
    ></fx-picker-view>
  </fx-group>
  <fx-group title="change 事件">
    <fx-picker-view
      :options="multiOptions"
      @change="onChangeEvent"
      v-model="changeValue"
    ></fx-picker-view>
  </fx-group>
</template>
