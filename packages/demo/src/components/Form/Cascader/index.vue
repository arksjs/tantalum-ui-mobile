<script setup lang="ts">
import { ref } from 'vue'
import { cascadeOptions, regionOptions } from '../Picker/data'
import {
  showToast,
  showCascader,
  type SelectorModelValue,
  type SelectorValueFormatter,
  type SelectorValueParser
} from '@/index'

const separator = '-'
const placeholder = '选择家电'

const disableValue = ref(['bingxiang', 'sanmen'])
const formatValue = ref(`bingxiang${separator}duikaimen`)

const formatter: SelectorValueFormatter = (valueArray, labelArray) => {
  return {
    value: valueArray.join(separator),
    label: labelArray.join(separator)
  }
}

const parser: SelectorValueParser = value => {
  return value ? (value as string).split(separator) : []
}

function onChange(res: SelectorModelValue) {
  console.log('change', res)

  showToast(`选择了 ${res}`)
}

function onCallApi() {
  showCascader({
    options: cascadeOptions,
    success: res => {
      console.log('success', res)
      if (res.cancel) {
        showToast('取消了')
      } else {
        showToast(`选择了 ${res.detail.label}`)
      }
    }
  })
}
</script>

<script lang="ts">
export default {
  name: 'ExpCascader'
}
</script>

<template>
  <ak-group title="基础用法">
    <ak-cell label="家电">
      <ak-cascader :options="cascadeOptions" />
    </ak-cell>
    <ak-cell label="地区">
      <ak-cascader :options="regionOptions" :fieldNames="{ value: 'label' }" />
    </ak-cell>
    <ak-cell label="placeholder">
      <ak-cascader :options="cascadeOptions" :placeholder="placeholder" />
    </ak-cell>
    <ak-cell label="formatter/parser">
      <ak-cascader
        :options="cascadeOptions"
        :placeholder="placeholder"
        v-model="formatValue"
        :formatter="formatter"
        :parser="parser"
      />
    </ak-cell>
    <ak-cell label="禁用">
      <ak-cascader
        :modelValue="disableValue"
        :options="cascadeOptions"
        disabled
      />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-cascader :options="cascadeOptions" @change="onChange" />
    </ak-cell>
  </ak-group>
  <ak-group title="API">
    <ak-cell label="showCascader" isLink @click="onCallApi()" />
  </ak-group>
</template>
