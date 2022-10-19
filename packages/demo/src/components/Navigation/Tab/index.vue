<template>
  <ak-group title="基础用法">
    <div class="exp-tab-box">
      <ak-tab :options="shortTabList"></ak-tab>
    </div>
  </ak-group>
  <ak-group title="滚动（阈值 scrollThreshold = 4）">
    <div class="exp-tab-box">
      <ak-tab :options="tabList"></ak-tab>
    </div>
  </ak-group>
  <ak-group title="Mix">
    <div class="exp-tab-box">
      <ak-tab :options="mixTabList"></ak-tab>
    </div>
  </ak-group>
  <ak-group title="带副标签">
    <div class="exp-tab-box">
      <ak-tab :options="subTabList"></ak-tab>
    </div>
  </ak-group>
  <ak-group title="change 事件">
    <div class="exp-tab-box">
      <ak-tab
        ref="tabRef"
        :options="shortTabList"
        v-model="shortActiveValue"
        @change="onChange"
      ></ak-tab>
    </div>
  </ak-group>
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
