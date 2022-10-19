<template>
  <ak-group title="基础用法">
    <ak-cell label="默认">
      <ak-radio />
    </ak-cell>
    <ak-cell label="带文案">
      <ak-radio v-model:checked="value">勾选</ak-radio>
    </ak-cell>
    <ak-cell label="默认激活">
      <ak-radio checked>勾选</ak-radio>
    </ak-cell>
    <ak-cell label="自定义颜色">
      <ak-radio checked activeColor="#8b1721">勾选</ak-radio>
    </ak-cell>
    <ak-cell label="禁用">
      <ak-radio disabled>勾选</ak-radio>
    </ak-cell>
  </ak-group>
  <ak-group title="RadioGroup">
    <ak-cell label="默认">
      <ak-radio-group v-model="groupValue">
        <ak-radio
          v-for="item in options"
          :key="item.value"
          :checkedValue="item.value"
        >
          {{ item.label }}
        </ak-radio>
      </ak-radio-group>
    </ak-cell>
    <ak-cell label="内联">
      <ak-radio-group inline v-model="groupValue" activeColor="#8b1721">
        <ak-radio
          v-for="item in options"
          :key="item.value"
          :checkedValue="item.value"
        >
          {{ item.label }}
        </ak-radio>
      </ak-radio-group>
    </ak-cell>
    <ak-cell label="禁用">
      <ak-radio-group modelValue="man" disabled>
        <ak-radio
          v-for="item in options"
          :key="item.value"
          :checkedValue="item.value"
        >
          {{ item.label }}
        </ak-radio>
      </ak-radio-group>
    </ak-cell>
    <ak-cell label="通过options设置">
      <ak-radio-group v-model="groupOptionValue" :options="options" />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-radio-group @change="onChange" name="gender">
        <ak-radio
          v-for="item in options"
          :key="item.value"
          :checkedValue="item.value"
        >
          {{ item.label }}
        </ak-radio>
      </ak-radio-group>
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpRadio',
  props: {},
  data() {
    return {
      value: false,
      groupValue: 'man',
      groupOptionValue: 'woman',
      options: [
        { value: 'man', label: '男' },
        { value: 'woman', label: '女' }
      ]
    }
  },
  methods: {
    onChange(value: string | number) {
      console.log('change', value)
      showToast(`Change Value: ${value}`)
    }
  }
})
</script>
