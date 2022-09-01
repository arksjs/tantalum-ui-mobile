<template>
  <fx-group title="基础用法">
    <fx-cell label="默认"><fx-rate /></fx-cell>
    <fx-cell label="modelValue=3"><fx-rate modelValue="3" /></fx-cell>
  </fx-group>
  <fx-group title="风格">
    <fx-cell label="爱心 icon='HeartOutlined' activeIcon='HeartFilled'"
      ><fx-rate icon="HeartOutlined" activeIcon="HeartFilled" modelValue="3"
    /></fx-cell>
    <fx-cell label="换色 activeColor='#F5A511'"
      ><fx-rate modelValue="3" activeColor="#F5A511"
    /></fx-cell>
    <fx-cell label="变小 size='16px'"
      ><fx-rate modelValue="3" size="16"
    /></fx-cell>
  </fx-group>
  <fx-group title="自定义数量">
    <fx-cell label="count=8"><fx-rate count="8" /></fx-cell>
  </fx-group>
  <fx-group title="半星">
    <fx-cell label="modelValue=2.5"
      ><fx-rate allow-half v-model="value" :count="count"
    /></fx-cell>
  </fx-group>
  <fx-group title="状态">
    <fx-cell label="只读"><fx-rate readonly :modelValue="3" /></fx-cell>
    <fx-cell label="禁用"><fx-rate disabled :modelValue="3" /></fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="change"><fx-rate allow-half @change="onChange" /></fx-cell>
  </fx-group>
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
