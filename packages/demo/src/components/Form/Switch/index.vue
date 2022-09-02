<template>
  <ak-group title="基础用法">
    <ak-cell label="开关"><ak-switch /></ak-cell>
  </ak-group>
  <ak-group title="自定义颜色/大小">
    <ak-cell label="红色"
      ><ak-switch activeColor="#8b1721" color="#d79996"
    /></ak-cell>
    <ak-cell label="40px"><ak-switch size="40" /></ak-cell>
  </ak-group>
  <ak-group title="禁用">
    <ak-cell label="关"><ak-switch disabled /></ak-cell>
    <ak-cell label="开"><ak-switch disabled :modelValue="true" /></ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change">
      <ak-switch v-model="value" @change="onChange" />
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpSwitch',
  data() {
    return { value: false }
  },
  methods: {
    onChange(value: boolean) {
      console.log('change', value)
      showToast(value ? '开' : '关')
    }
  }
})
</script>
