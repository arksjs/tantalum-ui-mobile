<template>
  <ta-group title="基础用法">
    <div class="exp-sideTab-box">
      <ta-side-tab
        ref="sideTabRef"
        :options="tabList"
        v-model="activeValue"
      ></ta-side-tab>
    </div>
  </ta-group>
  <ta-group title="Mix">
    <div class="exp-sideTab-box">
      <ta-side-tab :options="mixTabList"></ta-side-tab>
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mixTabList, tabList } from '../Tab/data'

export default defineComponent({
  name: 'ExpSideTab',
  setup() {
    const sideTabRef = ref()

    return {
      sideTabRef,
      activeValue: ref(1),
      mixTabList,
      tabList
    }
  }
})
</script>
