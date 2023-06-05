<template>
  <ta-group title="基础用法">
    <ta-cell label="默认"><ta-rate /></ta-cell>
    <ta-cell label="modelValue=3"><ta-rate modelValue="3" /></ta-cell>
  </ta-group>
  <ta-group title="风格">
    <ta-cell label="爱心 icon='HeartOutlined' activeIcon='HeartFilled'"
      ><ta-rate icon="HeartOutlined" activeIcon="HeartFilled" modelValue="3"
    /></ta-cell>
    <ta-cell label="换色 activeColor='#F5A511'"
      ><ta-rate modelValue="3" activeColor="#F5A511"
    /></ta-cell>
    <ta-cell label="变小 size='16px'"><ta-rate modelValue="3" size="16" /></ta-cell>
  </ta-group>
  <ta-group title="自定义数量">
    <ta-cell label="count=8"><ta-rate count="8" /></ta-cell>
  </ta-group>
  <ta-group title="半星">
    <ta-cell label="modelValue=2.5"><ta-rate allow-half v-model="value" :count="count" /></ta-cell>
  </ta-group>
  <ta-group title="状态">
    <ta-cell label="只读"><ta-rate readonly :modelValue="3" /></ta-cell>
    <ta-cell label="禁用"><ta-rate disabled :modelValue="3" /></ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="change"><ta-rate allow-half @change="onChange" /></ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpRate',
  data() {
    return {
      count: 5,
      value: 2.5
    }
  },
  methods: {
    onChange(value: number) {
      showToast(`Value: ${value}`)
    }
  }
})
</script>
