<script setup lang="ts">
import { ref } from 'vue'
import { cascadeOptions, multiOptions, options, regionOptions } from './data'
import {
  showToast,
  showPicker,
  type SelectorModelValue,
  type SelectorValueFormatter,
  type SelectorValueParser
} from '@/index'

const regionValue = ref([])
const disableValue = ref([2000, '春'])

const separator = '-'
const formatValue = ref(`2001${separator}夏`)

const formatter: SelectorValueFormatter = (valueArray, labelArray) => {
  return {
    value: valueArray.join(separator),
    label: labelArray.join(separator)
  }
}

const parser: SelectorValueParser = value => {
  return value ? (value as string).split(separator) : []
}

function onCallApi() {
  showPicker({
    title: 'Picker',
    options: multiOptions
  }).then(res => {
    console.log('success', res)
    if (res.cancel) {
      showToast('取消了')
    } else {
      showToast(`选择了 ${res.detail.label}`)
    }
  })
}

function onChange(res: SelectorModelValue) {
  console.log('change', res)
}
</script>

<script lang="ts">
export default {
  name: 'ExpPicker'
}
</script>

<template>
  <ta-group title="基础用法">
    <ta-cell label="单列">
      <ta-picker :options="options" @change="onChange"></ta-picker>
    </ta-cell>
    <ta-cell label="多列">
      <ta-picker :options="multiOptions" @change="onChange"></ta-picker>
    </ta-cell>
    <ta-cell label="级联">
      <ta-picker :options="cascadeOptions" @change="onChange"></ta-picker>
    </ta-cell>
    <ta-cell label="地区">
      <ta-picker
        :options="regionOptions"
        :fieldNames="{ value: 'label' }"
        v-model="regionValue"
        @change="onChange"
      />
    </ta-cell>
    <ta-cell label="formatter/parser">
      <ta-picker
        v-model="formatValue"
        :formatter="formatter"
        :parser="parser"
        :options="multiOptions"
        @change="onChange"
      ></ta-picker>
    </ta-cell>
    <ta-cell label="禁用">
      <ta-picker :modelValue="disableValue" :options="multiOptions" disabled />
    </ta-cell>
  </ta-group>
  <ta-group title="API">
    <ta-cell label="showPicker" isLink @click="onCallApi" />
  </ta-group>
</template>
