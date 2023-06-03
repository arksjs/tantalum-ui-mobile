<template>
  <ta-group title="基础用法">
    <ta-pagination v-model="current" :total="total"></ta-pagination>
  </ta-group>
  <ta-group title="Slot default">
    <ta-pagination v-model="current2" :total="total">
      <template #default="{ current }"> 第 {{ current }} 页 </template>
    </ta-pagination>
  </ta-group>
  <ta-group title="Slot prev & next">
    <ta-pagination v-model="current3" :total="total">
      <template #prev> 上一页 </template>
      <template #next> 下一页 </template>
    </ta-pagination>
  </ta-group>
  <ta-group title="CSS height=32px">
    <ta-pagination style="height: 32px" v-model="current4" :total="total"></ta-pagination>
  </ta-group>
  <ta-group title="事件监听 change">
    <ta-pagination v-model="current6" :total="total" @change="onChange"></ta-pagination>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpPagination',
  setup() {
    const current = ref(2)
    const current2 = ref(1)
    const current3 = ref(1)
    const current4 = ref(1)
    const current5 = ref(1)
    const current6 = ref(1)
    const total = 5

    const onChange = (current: number) => {
      console.log('change', current)
      showToast(`跳转到第 ${current} 页`)
    }

    return {
      current,
      current2,
      current3,
      current4,
      current5,
      current6,
      total,
      onChange
    }
  }
})
</script>
