<template>
  <ta-group title="基础用法">
    <ta-cell class="exp-slider-box" :label="'value: ' + value">
      <ta-slider v-model="value" />
    </ta-cell>
  </ta-group>
  <ta-group title="显示数值 showValue=true">
    <ta-cell class="exp-slider-box" :label="'value: ' + value2">
      <ta-slider show-value v-model="value2" />
    </ta-cell>
  </ta-group>
  <ta-group title="自定义颜色 color=#ff7875">
    <ta-cell class="exp-slider-box" :label="'value: ' + value3">
      <ta-slider color="#ff7875" v-model="value3" show-value />
    </ta-cell>
  </ta-group>
  <ta-group title="设置步进（step=5）">
    <ta-cell class="exp-slider-box" :label="'value: ' + value4">
      <ta-slider show-value v-model="value4" step="5" />
    </ta-cell>
  </ta-group>
  <ta-group title="限制范围 min=40 & max=140">
    <ta-cell class="exp-slider-box" :label="'value: ' + value5">
      <ta-slider show-value :min="min" :max="max" v-model="value5" />
    </ta-cell>
  </ta-group>
  <ta-group title="禁用">
    <ta-cell class="exp-slider-box" :label="'value: ' + value6">
      <ta-slider disabled v-model="value6" />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell class="exp-slider-box" label="input"
      ><ta-slider v-model="value7" @input="onInput" />
    </ta-cell>
    <ta-cell class="exp-slider-box" label="change"
      ><ta-slider v-model="value8" @change="onChange" />
    </ta-cell>
  </ta-group>
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
