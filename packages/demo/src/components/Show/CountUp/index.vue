<template>
  <fx-group title="基础用法">
    <fx-cell label="默认">
      <fx-count-up :number="1000" />
    </fx-cell>
    <fx-cell label="千分位 thousands">
      <fx-count-up :initialNumber="initialNumber" :number="number" thousands />
    </fx-cell>
    <fx-cell label="小数位 decimalDigits=2">
      <fx-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
      />
    </fx-cell>
  </fx-group>
  <fx-group title="速度">
    <fx-cell label="speed=slow">
      <fx-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="slow"
      />
    </fx-cell>
    <fx-cell label="speed=normal">
      <fx-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="normal"
      />
    </fx-cell>
    <fx-cell label="speed=fast">
      <fx-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        speed="fast"
      />
    </fx-cell>
    <fx-cell label="speed=10000（固定10秒动画）">
      <fx-count-up
        :initialNumber="initialNumber"
        :number="number"
        :decimalDigits="2"
        :speed="10000"
      />
    </fx-cell>
  </fx-group>
  <fx-group title="事件监听">
    <fx-cell label="animated">
      <fx-count-up :number="500" @animated="onAnimated" />
    </fx-cell>
    <fx-cell label="cancel" class="exp-countUp-box">
      <div class="exp-countUp-r">
        <fx-count-up
          :initialNumber="0"
          :number="number2"
          thousands
          ref="countUp"
          @animated="onAnimated2"
          @cancel="onCancel"
        />
      </div>
      <fx-button @click="cancel" size="small">{{
        isCancel ? '开始' : '取消'
      }}</fx-button>
    </fx-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CountUp, CountUpOnAnimated, CountUpOnCancel, showToast } from '@/index'

export default defineComponent({
  name: 'ExpCountUp',
  setup() {
    const number = ref(5000)
    const number2 = ref(1000)
    const isCancel = ref(false)
    const countUp = ref<InstanceType<typeof CountUp>>()

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
