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
  <ta-group title="基础用法">
    <ta-cell label="家电">
      <ta-cascader :options="cascadeOptions" />
    </ta-cell>
    <ta-cell label="地区">
      <ta-cascader :options="regionOptions" :fieldNames="{ value: 'label' }" />
    </ta-cell>
    <ta-cell label="placeholder">
      <ta-cascader :options="cascadeOptions" :placeholder="placeholder" />
    </ta-cell>
    <ta-cell label="formatter/parser">
      <ta-cascader
        :options="cascadeOptions"
        :placeholder="placeholder"
        v-model="formatValue"
        :formatter="formatter"
        :parser="parser"
      />
    </ta-cell>
    <ta-cell label="禁用">
      <ta-cascader
        :modelValue="disableValue"
        :options="cascadeOptions"
        disabled
      />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-cascader :options="cascadeOptions" @change="onChange" />
    </ta-cell>
  </ta-group>
  <ta-group title="API">
    <ta-cell label="showCascader" isLink @click="onCallApi()" />
  </ta-group>
</template>
