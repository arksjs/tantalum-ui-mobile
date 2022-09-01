<template>
  <fx-group title="基础用法">
    <fx-cell label="默认">
      <fx-radio />
    </fx-cell>
    <fx-cell label="带文案">
      <fx-radio v-model:checked="value">勾选</fx-radio>
    </fx-cell>
    <fx-cell label="默认激活">
      <fx-radio checked>勾选</fx-radio>
    </fx-cell>
    <fx-cell label="自定义颜色">
      <fx-radio checked activeColor="#8b1721">勾选</fx-radio>
    </fx-cell>
    <fx-cell label="禁用">
      <fx-radio disabled>勾选</fx-radio>
    </fx-cell>
  </fx-group>
  <fx-group title="RadioGroup">
    <fx-cell label="默认">
      <fx-radio-group v-model="groupValue">
        <fx-radio v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </fx-radio>
      </fx-radio-group>
    </fx-cell>
    <fx-cell label="内联">
      <fx-radio-group inline v-model="groupValue" activeColor="#8b1721">
        <fx-radio v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </fx-radio>
      </fx-radio-group>
    </fx-cell>
    <fx-cell label="禁用">
      <fx-radio-group modelValue="man" disabled>
        <fx-radio v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </fx-radio>
      </fx-radio-group>
    </fx-cell>
    <fx-cell label="通过options设置">
      <fx-radio-group v-model="groupOptionValue" :options="options" />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change">
      <fx-radio-group @change="onChange" name="gender">
        <fx-radio v-for="item in options" :key="item.value" :value="item.value">
          {{ item.label }}
        </fx-radio>
      </fx-radio-group>
    </fx-cell>
  </fx-group>
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
