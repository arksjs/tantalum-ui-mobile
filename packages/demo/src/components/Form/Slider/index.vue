<template>
  <fx-group title="基础用法">
    <fx-cell class="exp-slider-box" :label="'value: ' + value">
      <fx-slider v-model="value" />
    </fx-cell>
  </fx-group>
  <fx-group title="显示数值 showValue=true">
    <fx-cell class="exp-slider-box" :label="'value: ' + value2">
      <fx-slider show-value v-model="value2" />
    </fx-cell>
  </fx-group>
  <fx-group title="自定义颜色 color=#ff7875">
    <fx-cell class="exp-slider-box" :label="'value: ' + value3">
      <fx-slider color="#ff7875" v-model="value3" show-value />
    </fx-cell>
  </fx-group>
  <fx-group title="设置步进（step=5）">
    <fx-cell class="exp-slider-box" :label="'value: ' + value4">
      <fx-slider show-value v-model="value4" step="5" />
    </fx-cell>
  </fx-group>
  <fx-group title="限制范围 min=40 & max=140">
    <fx-cell class="exp-slider-box" :label="'value: ' + value5">
      <fx-slider show-value :min="min" :max="max" v-model="value5" />
    </fx-cell>
  </fx-group>
  <fx-group title="禁用">
    <fx-cell class="exp-slider-box" :label="'value: ' + value6">
      <fx-slider disabled v-model="value6" />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell class="exp-slider-box" label="input"
      ><fx-slider v-model="value7" @input="onInput" />
    </fx-cell>
    <fx-cell class="exp-slider-box" label="change"
      ><fx-slider v-model="value8" @change="onChange" />
    </fx-cell>
  </fx-group>
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
