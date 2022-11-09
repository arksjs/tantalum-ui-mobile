<template>
  <ta-group title="基础用法">
    <ta-cell class="exp-range-box" :label="'value: ' + value">
      <ta-range v-model="value" />
    </ta-cell>
  </ta-group>
  <ta-group title="显示数值 showValue=true">
    <ta-cell class="exp-range-box" :label="'value: ' + value2">
      <ta-range show-value v-model="value2" />
    </ta-cell>
  </ta-group>
  <ta-group title="自定义颜色 color=#ff7875">
    <ta-cell class="exp-range-box" :label="'value: ' + value3">
      <ta-range color="#ff7875" v-model="value3" show-value />
    </ta-cell>
  </ta-group>
  <ta-group title="返回不允许重叠 allowSameValue=false">
    <ta-cell class="exp-range-box" :label="'value: ' + value4">
      <ta-range show-value v-model="value4" :allowSameValue="false" />
    </ta-cell>
  </ta-group>
  <ta-group title="设置步进（step=5）">
    <ta-cell class="exp-range-box" :label="'value: ' + value5">
      <ta-range show-value v-model="value5" step="5" />
    </ta-cell>
  </ta-group>
  <ta-group title="限制范围 min=50 & max=150">
    <ta-cell class="exp-range-box" :label="'value: ' + value6">
      <ta-range show-value :min="min" :max="max" v-model="value6" />
    </ta-cell>
  </ta-group>
  <ta-group title="禁用">
    <ta-cell class="exp-range-box" :label="'value: ' + value7">
      <ta-range disabled v-model="value7" />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell class="exp-range-box" label="input"
      ><ta-range v-model="value8" @input="onInput" />
    </ta-cell>
    <ta-cell class="exp-range-box" label="change"
      ><ta-range v-model="value9" @change="onChange" />
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpRange',
  data() {
    return {
      min: 50,
      max: 150,

      value: undefined,
      value2: [10, 60],
      value3: [20, 70],
      value4: [30, 80],
      value5: [40, 90],
      value6: [0, 100],
      value7: [0, 100],
      value8: undefined,
      value9: undefined
    }
  },
  methods: {
    onInput(value: number[]) {
      showToast(`Input value: ${value}`)
    },
    onChange(value: number[]) {
      showToast(`Change value: ${value}`)
    }
  }
})
</script>
