<script setup lang="ts">
import { ref } from 'vue'
import { cascadeOptions, regionOptions } from '../Picker/data'
import {
  showToast,
  showCascader,
  SelectorModelValue,
  SelectorValueFormatter,
  SelectorValueParser
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

<template>
  <fx-group title="基础用法">
    <fx-cell label="家电">
      <fx-cascader :options="cascadeOptions" />
    </fx-cell>
    <fx-cell label="地区">
      <fx-cascader :options="regionOptions" :fieldNames="{ value: 'label' }" />
    </fx-cell>
    <fx-cell label="placeholder">
      <fx-cascader :options="cascadeOptions" :placeholder="placeholder" />
    </fx-cell>
    <fx-cell label="formatter/parser">
      <fx-cascader
        :options="cascadeOptions"
        :placeholder="placeholder"
        v-model="formatValue"
        :formatter="formatter"
        :parser="parser"
      />
    </fx-cell>
    <fx-cell label="禁用">
      <fx-cascader
        :modelValue="disableValue"
        :options="cascadeOptions"
        disabled
      />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change">
      <fx-cascader :options="cascadeOptions" @change="onChange" />
    </fx-cell>
  </fx-group>
  <fx-group title="API">
    <fx-cell label="showCascader" isLink @click="onCallApi()" />
  </fx-group>
</template>
