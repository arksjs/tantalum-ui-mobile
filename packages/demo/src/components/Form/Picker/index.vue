<script setup lang="ts">
import { ref } from 'vue'
import { cascadeOptions, multiOptions, options, regionOptions } from './data'
import {
  showToast,
  showPicker,
  SelectorModelValue,
  SelectorValueFormatter,
  SelectorValueParser
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

<template>
  <fx-group title="基础用法">
    <fx-cell label="单列">
      <fx-picker :options="options" @change="onChange"></fx-picker>
    </fx-cell>
    <fx-cell label="多列">
      <fx-picker :options="multiOptions" @change="onChange"></fx-picker>
    </fx-cell>
    <fx-cell label="级联">
      <fx-picker :options="cascadeOptions" @change="onChange"></fx-picker>
    </fx-cell>
    <fx-cell label="地区">
      <fx-picker
        :options="regionOptions"
        :fieldNames="{ value: 'label' }"
        v-model="regionValue"
        @change="onChange"
      />
    </fx-cell>
    <fx-cell label="formatter/parser">
      <fx-picker
        v-model="formatValue"
        :formatter="formatter"
        :parser="parser"
        :options="multiOptions"
        @change="onChange"
      ></fx-picker>
    </fx-cell>
    <fx-cell label="禁用">
      <fx-picker :modelValue="disableValue" :options="multiOptions" disabled />
    </fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showPicker" isLink @click="onCallApi" />
  </fx-group>
</template>
