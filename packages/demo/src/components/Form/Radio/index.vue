<template>
  <ta-group title="基础用法">
    <ta-cell label="默认">
      <ta-radio />
    </ta-cell>
    <ta-cell label="带文案">
      <ta-radio v-model:checked="value">勾选</ta-radio>
    </ta-cell>
    <ta-cell label="默认激活">
      <ta-radio checked>勾选</ta-radio>
    </ta-cell>
    <ta-cell label="自定义颜色">
      <ta-radio checked activeColor="#8b1721">勾选</ta-radio>
    </ta-cell>
    <ta-cell label="禁用">
      <ta-radio disabled>勾选</ta-radio>
    </ta-cell>
  </ta-group>
  <ta-group title="RadioGroup">
    <ta-cell label="默认">
      <ta-radio-group v-model="groupValue">
        <ta-radio v-for="item in options" :key="item.value" :checkedValue="item.value">
          {{ item.label }}
        </ta-radio>
      </ta-radio-group>
    </ta-cell>
    <ta-cell label="内联">
      <ta-radio-group inline v-model="groupValue" activeColor="#8b1721">
        <ta-radio v-for="item in options" :key="item.value" :checkedValue="item.value">
          {{ item.label }}
        </ta-radio>
      </ta-radio-group>
    </ta-cell>
    <ta-cell label="禁用">
      <ta-radio-group modelValue="man" disabled>
        <ta-radio v-for="item in options" :key="item.value" :checkedValue="item.value">
          {{ item.label }}
        </ta-radio>
      </ta-radio-group>
    </ta-cell>
    <ta-cell label="通过options设置">
      <ta-radio-group v-model="groupOptionValue" :options="options" />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-radio-group @change="onChange" name="gender">
        <ta-radio v-for="item in options" :key="item.value" :checkedValue="item.value">
          {{ item.label }}
        </ta-radio>
      </ta-radio-group>
    </ta-cell>
  </ta-group>
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
