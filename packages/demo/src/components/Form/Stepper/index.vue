<template>
  <ta-group title="基础用法">
    <ta-cell label="默认">
      <ta-stepper />
    </ta-cell>
    <ta-cell label="步长设置">
      <ta-stepper :step="2" />
    </ta-cell>
    <ta-cell label="限制输入范围">
      <ta-stepper :min="5" :max="10" />
    </ta-cell>
    <ta-cell label="限制输入整数">
      <ta-stepper :decimal-length="0" />
    </ta-cell>
    <ta-cell label="禁用状态">
      <ta-stepper :disabled="true" />
    </ta-cell>
    <ta-cell label="禁用输入框">
      <ta-stepper :disabled-input="true" />
    </ta-cell>
    <ta-cell label="固定小数位">
      <ta-stepper :decimal-length="1" :step="0.2" />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-stepper @change="onChange" v-model="value" />
    </ta-cell>
    <ta-cell label="input/focus/blur/plus-click/minus-click">
      <ta-stepper
        @plus-click="onPlusClick"
        @minus-click="onMinusClick"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpStepper',
  data() {
    return { value: '1' }
  },
  methods: {
    onChange(value: string) {
      console.log('change', value)
      showToast(`值改变为：${value}`)
    },
    onInput(value: string) {
      console.log('input', value)
      showToast(`当前值为：${value}`)
    },
    onPlusClick() {
      showToast('点击 + 按钮')
    },
    onMinusClick() {
      showToast('点击 - 按钮')
    },
    onFocus() {
      showToast('聚焦 focus')
    },
    onBlur() {
      showToast('失焦 blur')
    }
  }
})
</script>
