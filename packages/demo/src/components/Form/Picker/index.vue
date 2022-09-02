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
  <ak-group title="基础用法">
    <ak-cell label="单列">
      <ak-picker :options="options" @change="onChange"></ak-picker>
    </ak-cell>
    <ak-cell label="多列">
      <ak-picker :options="multiOptions" @change="onChange"></ak-picker>
    </ak-cell>
    <ak-cell label="级联">
      <ak-picker :options="cascadeOptions" @change="onChange"></ak-picker>
    </ak-cell>
    <ak-cell label="地区">
      <ak-picker
        :options="regionOptions"
        :fieldNames="{ value: 'label' }"
        v-model="regionValue"
        @change="onChange"
      />
    </ak-cell>
    <ak-cell label="formatter/parser">
      <ak-picker
        v-model="formatValue"
        :formatter="formatter"
        :parser="parser"
        :options="multiOptions"
        @change="onChange"
      ></ak-picker>
    </ak-cell>
    <ak-cell label="禁用">
      <ak-picker :modelValue="disableValue" :options="multiOptions" disabled />
    </ak-cell>
  </ak-group>
  <ak-group title="API">
    <ak-cell label="showPicker" isLink @click="onCallApi" />
  </ak-group>
</template>
