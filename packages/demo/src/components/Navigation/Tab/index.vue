<template>
  <ak-group title="基础用法">
    <div class="exp-tab-box">
      <ak-tab
        :options="shortTabList"
        v-model:activeValue="shortActiveValue"
      ></ak-tab>
    </div>
  </ak-group>
  <ak-group title="滚动（阈值 scrollThreshold = 4）">
    <div class="exp-tab-box">
      <ak-tab :options="tabList" v-model:activeValue="activeValue"></ak-tab>
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
        :options="shortTabList"
        v-model="value"
        @change="onChange"
      ></ak-tab>
    </div>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { shortTabList, tabList, mixTabList, subTabList } from './data'
import { type TabOnChange, showToast } from '@/index'

export default defineComponent({
  name: 'ExpTab',
  setup() {
    const onChange: TabOnChange = (value, index) => {
      console.log('change', { value, index })
      showToast(`切换到第${index + 1}个`)
    }

    const value = ref(0)

    return {
      shortActiveValue: ref(1),
      activeValue: ref(1),
      shortTabList,
      tabList,
      mixTabList,
      subTabList,

      value,
      onChange
    }
  }
})
</script>
