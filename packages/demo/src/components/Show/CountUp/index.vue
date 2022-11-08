<template>
  <ta-group title="基础用法">
    <ta-cell label="默认">
      <ta-count-up :number="1000" />
    </ta-cell>
    <ta-cell label="千分位 thousands">
      <ta-count-up :initialNumber="initialNumber" :number="number" thousands />
    </ta-cell>
    <ta-cell label="小数位 decimalDigits=2">
      <ta-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
      />
    </ta-cell>
  </ta-group>
  <ta-group title="速度">
    <ta-cell label="speed=slow">
      <ta-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="slow"
      />
    </ta-cell>
    <ta-cell label="speed=normal">
      <ta-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="normal"
      />
    </ta-cell>
    <ta-cell label="speed=fast">
      <ta-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="fast"
      />
    </ta-cell>
    <ta-cell label="speed=10000（固定10秒动画）">
      <ta-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        :speed="10000"
      />
    </ta-cell>
  </ta-group>
  <ta-group title="事件监听">
    <ta-cell label="animated">
      <ta-count-up :number="500" @animated="onAnimated" />
    </ta-cell>
    <ta-cell label="cancel" class="exp-countUp-box">
      <div class="exp-countUp-r">
        <ta-count-up
          :initialNumber="0"
          :number="number2"
          thousands
          ref="countUp"
          @animated="onAnimated2"
          @cancel="onCancel"
        />
      </div>
      <ta-button @click="cancel" size="small">{{
        isCancel ? '开始' : '取消'
      }}</ta-button>
    </ta-cell>
  </ta-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  TaCountUp,
  type CountUpOnAnimated,
  type CountUpOnCancel,
  showToast
} from '@/index'

export default defineComponent({
  name: 'ExpCountUp',
  setup() {
    const number = ref(5000)
    const number2 = ref(1000)
    const isCancel = ref(false)
    const countUp = ref<InstanceType<typeof TaCountUp>>()

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
