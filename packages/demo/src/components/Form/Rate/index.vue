<template>
  <ak-group title="基础用法">
    <ak-cell label="默认"><ak-rate /></ak-cell>
    <ak-cell label="modelValue=3"><ak-rate modelValue="3" /></ak-cell>
  </ak-group>
  <ak-group title="风格">
    <ak-cell label="爱心 icon='HeartOutlined' activeIcon='HeartFilled'"
      ><ak-rate icon="HeartOutlined" activeIcon="HeartFilled" modelValue="3"
    /></ak-cell>
    <ak-cell label="换色 activeColor='#F5A511'"
      ><ak-rate modelValue="3" activeColor="#F5A511"
    /></ak-cell>
    <ak-cell label="变小 size='16px'"
      ><ak-rate modelValue="3" size="16"
    /></ak-cell>
  </ak-group>
  <ak-group title="自定义数量">
    <ak-cell label="count=8"><ak-rate count="8" /></ak-cell>
  </ak-group>
  <ak-group title="半星">
    <ak-cell label="modelValue=2.5"
      ><ak-rate allow-half v-model="value" :count="count"
    /></ak-cell>
  </ak-group>
  <ak-group title="状态">
    <ak-cell label="只读"><ak-rate readonly :modelValue="3" /></ak-cell>
    <ak-cell label="禁用"><ak-rate disabled :modelValue="3" /></ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="change"><ak-rate allow-half @change="onChange" /></ak-cell>
  </ak-group>
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
