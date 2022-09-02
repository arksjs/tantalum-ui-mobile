<template>
  <ak-group title="基础用法">
    <ak-cell label="默认">
      <ak-count-up :number="1000" />
    </ak-cell>
    <ak-cell label="千分位 thousands">
      <ak-count-up :initialNumber="initialNumber" :number="number" thousands />
    </ak-cell>
    <ak-cell label="小数位 decimalDigits=2">
      <ak-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
      />
    </ak-cell>
  </ak-group>
  <ak-group title="速度">
    <ak-cell label="speed=slow">
      <ak-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="slow"
      />
    </ak-cell>
    <ak-cell label="speed=normal">
      <ak-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="normal"
      />
    </ak-cell>
    <ak-cell label="speed=fast">
      <ak-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="fast"
      />
    </ak-cell>
    <ak-cell label="speed=10000（固定10秒动画）">
      <ak-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        :speed="10000"
      />
    </ak-cell>
  </ak-group>
  <ak-group title="事件监听">
    <ak-cell label="animated">
      <ak-count-up :number="500" @animated="onAnimated" />
    </ak-cell>
    <ak-cell label="cancel" class="exp-countUp-box">
      <div class="exp-countUp-r">
        <ak-count-up
          :initialNumber="0"
          :number="number2"
          thousands
          ref="countUp"
          @animated="onAnimated2"
          @cancel="onCancel"
        />
      </div>
      <ak-button @click="cancel" size="small">{{
        isCancel ? '开始' : '取消'
      }}</ak-button>
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  AkCountUp,
  CountUpOnAnimated,
  CountUpOnCancel,
  showToast
} from '@/index'

export default defineComponent({
  name: 'ExpCountUp',
  setup() {
    const number = ref(5000)
    const number2 = ref(1000)
    const isCancel = ref(false)
    const countUp = ref<InstanceType<typeof AkCountUp>>()

    const onAnimated: CountUpOnAnimated = e => {
      console.log(e)
      showToast('动画结束')
    }

    const onAnimated2: CountUpOnAnimated = e => {
      console.log('animated', e)
    }

    const onCancel: CountUpOnCancel = e => {
      console.log('cancel', e)
      number2.value = e.number
    }

    function cancel() {
      if (!isCancel.value) {
        countUp.value?.cancel()
        showToast('已取消')
      } else {
        number2.value = number2.value > 500 ? 0 : 1000
      }

      isCancel.value = !isCancel.value
    }

    return {
      initialNumber: 1000,
      number,
      number2,
      isCancel,
      countUp,

      onAnimated,
      onAnimated2,
      onCancel,
      cancel
    }
  }
})
</script>
