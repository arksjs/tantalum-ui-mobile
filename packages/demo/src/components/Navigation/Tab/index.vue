<template>
  <fx-group title="基础用法">
    <div class="exp-tab-box">
      <fx-tab
        :options="shortTabList"
        v-model:activeValue="shortActiveValue"
      ></fx-tab>
    </div>
  </fx-group>
  <fx-group title="滚动（阈值 scrollThreshold = 4）">
    <div class="exp-tab-box">
      <fx-tab :options="tabList" v-model:activeValue="activeValue"></fx-tab>
    </div>
  </fx-group>
  <fx-group title="Mix">
    <div class="exp-tab-box">
      <fx-tab :options="mixTabList"></fx-tab>
    </div>
  </fx-group>
  <fx-group title="带副标签">
    <div class="exp-tab-box">
      <fx-tab :options="subTabList"></fx-tab>
    </div>
  </fx-group>
  <fx-group title="change 事件">
    <div class="exp-tab-box">
      <fx-tab :options="shortTabList" @change="onChange"></fx-tab>
    </div>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { shortTabList, tabList, mixTabList, subTabList } from './data'
import { TabOnChange, showToast } from '@/index'

export default defineComponent({
  name: 'ExpTab',
  setup() {
    const onChange: TabOnChange = (value, index) => {
      console.log('change', { value, index })
      showToast(`切换到第${index + 1}个`)
    }

    return {
      shortActiveValue: ref(1),
      activeValue: ref(1),
      shortTabList,
      tabList,
      mixTabList,
      subTabList,

      onChange
    }
  }
})
</script>
