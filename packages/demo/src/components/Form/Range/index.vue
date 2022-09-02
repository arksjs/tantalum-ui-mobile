<template>
  <ak-group title="基础用法">
    <ak-cell class="exp-range-box" :label="'value: ' + value">
      <ak-range v-model="value" />
    </ak-cell>
  </ak-group>
  <ak-group title="显示数值 showValue=true">
    <ak-cell class="exp-range-box" :label="'value: ' + value2">
      <ak-range show-value v-model="value2" />
    </ak-cell>
  </ak-group>
  <ak-group title="自定义颜色 color=#ff7875">
    <ak-cell class="exp-range-box" :label="'value: ' + value3">
      <ak-range color="#ff7875" v-model="value3" show-value />
    </ak-cell>
  </ak-group>
  <ak-group title="返回不允许重叠 allowSameValue=false">
    <ak-cell class="exp-range-box" :label="'value: ' + value4">
      <ak-range show-value v-model="value4" :allowSameValue="false" />
    </ak-cell>
  </ak-group>
  <ak-group title="设置步进（step=5）">
    <ak-cell class="exp-range-box" :label="'value: ' + value5">
      <ak-range show-value v-model="value5" step="5" />
    </ak-cell>
  </ak-group>
  <ak-group title="限制范围 min=50 & max=150">
    <ak-cell class="exp-range-box" :label="'value: ' + value6">
      <ak-range show-value :min="min" :max="max" v-model="value6" />
    </ak-cell>
  </ak-group>
  <ak-group title="禁用">
    <ak-cell class="exp-range-box" :label="'value: ' + value7">
      <ak-range disabled v-model="value7" />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell class="exp-range-box" label="input"
      ><ak-range v-model="value8" @input="onInput" />
    </ak-cell>
    <ak-cell class="exp-range-box" label="change"
      ><ak-range v-model="value9" @change="onChange" />
    </ak-cell>
  </ak-group>
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
