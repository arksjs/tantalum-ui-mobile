<template>
  <fx-group title="基础用法">
    <fx-cell label="默认">
      <fx-stepper />
    </fx-cell>
    <fx-cell label="步长设置">
      <fx-stepper :step="2" />
    </fx-cell>
    <fx-cell label="限制输入范围">
      <fx-stepper :min="5" :max="10" />
    </fx-cell>
    <fx-cell label="限制输入整数">
      <fx-stepper :allow-decimal="false" />
    </fx-cell>
    <fx-cell label="禁用状态">
      <fx-stepper :disabled="true" />
    </fx-cell>
    <fx-cell label="禁用输入框">
      <fx-stepper :disabled-input="true" />
    </fx-cell>
    <fx-cell label="固定小数位">
      <fx-stepper :decimal-length="1" :step="0.2" />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change">
      <fx-stepper @change="onChange" v-model="value" />
    </fx-cell>
    <fx-cell label="input/focus/blur/plus-click/minus-click">
      <fx-stepper
        @plus-click="onPlusClick"
        @minus-click="onMinusClick"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
      />
    </fx-cell>
  </fx-group>
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
