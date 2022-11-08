<template>
  <ta-group title="基础用法">
    <div class="exp-tab-box">
      <ta-tab :options="shortTabList"></ta-tab>
    </div>
  </ta-group>
  <ta-group title="滚动（阈值 scrollThreshold = 4）">
    <div class="exp-tab-box">
      <ta-tab :options="tabList"></ta-tab>
    </div>
  </ta-group>
  <ta-group title="Mix">
    <div class="exp-tab-box">
      <ta-tab :options="mixTabList"></ta-tab>
    </div>
  </ta-group>
  <ta-group title="带副标签">
    <div class="exp-tab-box">
      <ta-tab :options="subTabList"></ta-tab>
    </div>
  </ta-group>
  <ta-group title="change 事件">
    <div class="exp-tab-box">
      <ta-tab
        ref="tabRef"
        :options="shortTabList"
        v-model="shortActiveValue"
        @change="onChange"
      ></ta-tab>
    </div>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { shortTabList, tabList, mixTabList, subTabList } from './data'
import { type TabOnChange, showToast, type TabRef } from '@/index'

export default defineComponent({
  name: 'ExpTab',
  setup() {
    const onChange: TabOnChange = (value, index) => {
      console.log('change', value, index)
      showToast(`切换到第${index + 1}个`)
    }

    const shortActiveValue = ref(0)

    const tabRef = ref<TabRef | null>(null)

    return {
      tabRef,
      shortActiveValue,
      shortTabList: reactive(shortTabList),
      tabList,
      mixTabList,
      subTabList,

      onChange
    }
  }
})
</script>
