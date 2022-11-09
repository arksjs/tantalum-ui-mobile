<template>
  <ta-group title="基础用法">
    <ta-cell label="开关"><ta-switch /></ta-cell>
  </ta-group>
  <ta-group title="自定义颜色/大小">
    <ta-cell label="红色"
      ><ta-switch activeColor="#8b1721" color="#d79996"
    /></ta-cell>
    <ta-cell label="40px"><ta-switch size="40" /></ta-cell>
  </ta-group>
  <ta-group title="禁用">
    <ta-cell label="关"><ta-switch disabled /></ta-cell>
    <ta-cell label="开"><ta-switch disabled :modelValue="true" /></ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change">
      <ta-switch v-model="value" @change="onChange" />
    </ta-cell>
  </ta-group>
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
