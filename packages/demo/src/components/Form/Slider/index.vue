<template>
  <ak-group title="基础用法">
    <ak-cell class="exp-slider-box" :label="'value: ' + value">
      <ak-slider v-model="value" />
    </ak-cell>
  </ak-group>
  <ak-group title="显示数值 showValue=true">
    <ak-cell class="exp-slider-box" :label="'value: ' + value2">
      <ak-slider show-value v-model="value2" />
    </ak-cell>
  </ak-group>
  <ak-group title="自定义颜色 color=#ff7875">
    <ak-cell class="exp-slider-box" :label="'value: ' + value3">
      <ak-slider color="#ff7875" v-model="value3" show-value />
    </ak-cell>
  </ak-group>
  <ak-group title="设置步进（step=5）">
    <ak-cell class="exp-slider-box" :label="'value: ' + value4">
      <ak-slider show-value v-model="value4" step="5" />
    </ak-cell>
  </ak-group>
  <ak-group title="限制范围 min=40 & max=140">
    <ak-cell class="exp-slider-box" :label="'value: ' + value5">
      <ak-slider show-value :min="min" :max="max" v-model="value5" />
    </ak-cell>
  </ak-group>
  <ak-group title="禁用">
    <ak-cell class="exp-slider-box" :label="'value: ' + value6">
      <ak-slider disabled v-model="value6" />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell class="exp-slider-box" label="input"
      ><ak-slider v-model="value7" @input="onInput" />
    </ak-cell>
    <ak-cell class="exp-slider-box" label="change"
      ><ak-slider v-model="value8" @change="onChange" />
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { showToast } from '@/index'

export default defineComponent({
  name: 'ExpSlider',
  data() {
    return {
      min: 40,
      max: 140,

      value: undefined,
      value2: 10,
      value3: 20,
      value4: 30,
      value5: 40,
      value6: 50,
      value7: 60,
      value8: 70
    }
  },
  methods: {
    onInput(value: number) {
      showToast(`Input value: ${value}`)
    },
    onChange(value: number) {
      showToast(`Change value: ${value}`)
    }
  }
})
</script>
