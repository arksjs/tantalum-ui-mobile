<template>
  <ak-group title="基础用法">
    <div class="exp-sideTab-box">
      <ak-side-tab
        ref="sideTabRef"
        :options="tabList"
        v-model="activeValue"
      ></ak-side-tab>
    </div>
  </ak-group>
  <ak-group title="Mix">
    <div class="exp-sideTab-box">
      <ak-side-tab :options="mixTabList"></ak-side-tab>
    </div>
  </ak-group>
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
