<template>
  <ak-group title="基础用法">
    <ak-cell label="默认">
      <ak-stepper />
    </ak-cell>
    <ak-cell label="步长设置">
      <ak-stepper :step="2" />
    </ak-cell>
    <ak-cell label="限制输入范围">
      <ak-stepper :min="5" :max="10" />
    </ak-cell>
    <ak-cell label="限制输入整数">
      <ak-stepper :allow-decimal="false" />
    </ak-cell>
    <ak-cell label="禁用状态">
      <ak-stepper :disabled="true" />
    </ak-cell>
    <ak-cell label="禁用输入框">
      <ak-stepper :disabled-input="true" />
    </ak-cell>
    <ak-cell label="固定小数位">
      <ak-stepper :decimal-length="1" :step="0.2" />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-stepper @change="onChange" v-model="value" />
    </ak-cell>
    <ak-cell label="input/focus/blur/plus-click/minus-click">
      <ak-stepper
        @plus-click="onPlusClick"
        @minus-click="onMinusClick"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </ak-cell>
  </ak-group>
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
