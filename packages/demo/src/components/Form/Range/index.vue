<template>
  <fx-group title="基础用法">
    <fx-cell class="exp-range-box" :label="'value: ' + value">
      <fx-range v-model="value" />
    </fx-cell>
  </fx-group>
  <fx-group title="显示数值 showValue=true">
    <fx-cell class="exp-range-box" :label="'value: ' + value2">
      <fx-range show-value v-model="value2" />
    </fx-cell>
  </fx-group>
  <fx-group title="自定义颜色 color=#ff7875">
    <fx-cell class="exp-range-box" :label="'value: ' + value3">
      <fx-range color="#ff7875" v-model="value3" show-value />
    </fx-cell>
  </fx-group>
  <fx-group title="返回不允许重叠 allowSameValue=false">
    <fx-cell class="exp-range-box" :label="'value: ' + value4">
      <fx-range show-value v-model="value4" :allowSameValue="false" />
    </fx-cell>
  </fx-group>
  <fx-group title="设置步进（step=5）">
    <fx-cell class="exp-range-box" :label="'value: ' + value5">
      <fx-range show-value v-model="value5" step="5" />
    </fx-cell>
  </fx-group>
  <fx-group title="限制范围 min=50 & max=150">
    <fx-cell class="exp-range-box" :label="'value: ' + value6">
      <fx-range show-value :min="min" :max="max" v-model="value6" />
    </fx-cell>
  </fx-group>
  <fx-group title="禁用">
    <fx-cell class="exp-range-box" :label="'value: ' + value7">
      <fx-range disabled v-model="value7" />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell class="exp-range-box" label="input"
      ><fx-range v-model="value8" @input="onInput" />
    </fx-cell>
    <fx-cell class="exp-range-box" label="change"
      ><fx-range v-model="value9" @change="onChange" />
    </fx-cell>
  </fx-group>
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
