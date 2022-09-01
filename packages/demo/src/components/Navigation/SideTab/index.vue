<template>
  <fx-group title="基础用法">
    <div class="exp-sideTab-box">
      <fx-side-tab
        :options="tabList"
        v-model:activeValue="activeValue"
      ></fx-side-tab>
    </div>
  </fx-group>
  <fx-group title="Mix">
    <div class="exp-sideTab-box">
      <fx-side-tab :options="mixTabList"></fx-side-tab>
    </div>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mixTabList, tabList } from '../Tab/data'

export default defineComponent({
  name: 'ExpSideTab',
  setup() {
    return {
      activeValue: ref(1),
      mixTabList,
      tabList
    }
  }
})
</script>
