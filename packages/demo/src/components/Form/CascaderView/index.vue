<script setup lang="ts">
import { ref } from 'vue'
import {
  showToast,
  type SelectorModelValue,
  type CascaderOnSelect
} from '@/index'
import { cascadeOptions } from '../Picker/data'

const changeValue = ref([])
const selectValue = ref([])
const baseValue = ref([])

function onChange(res: SelectorModelValue) {
  console.log('change', res)

  showToast(`change: ${res}`)
}

const onSelect: CascaderOnSelect = res => {
  console.log('select', res)

  showToast(`select: ${res.value}`)
}
</script>

<script lang="ts">
export default {
  name: 'ExpCascaderView'
}
</script>

<template>
  <ta-notice-bar class="top-notice-bar" title="基础展示参数可以参考 Cascader" />
  <ta-group title="家电">
    <ta-cascader-view :options="cascadeOptions" v-model="baseValue" />
  </ta-group>
  <ta-group title="空数据">
    <ta-cascader-view :options="[]" />
  </ta-group>
  <ta-group title="change 事件">
    <ta-cascader-view
      :options="cascadeOptions"
      @change="onChange"
      v-model="changeValue"
    />
  </ta-group>
  <ta-group title="select 事件（跟 change 的区别是重复选一样的也触发）">
    <ta-cascader-view
      :options="cascadeOptions"
      @select="onSelect"
      v-model="selectValue"
    />
  </ta-group>
</template>
