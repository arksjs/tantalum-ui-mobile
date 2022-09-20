<template>
  <ak-group title="基础用法">
    <ak-cell label="默认" class="exp-countDown-box">
      <ak-count-down :initialTiming="time"></ak-count-down>
    </ak-cell>
    <ak-cell label="显示天数" class="exp-countDown-box">
      <ak-count-down :initialTiming="time2" showDays></ak-count-down>
    </ak-cell>
  </ak-group>
  <ak-group title="Slot">
    <ak-cell label="中文显示" class="exp-countDown-box">
      <ak-count-down :initialTiming="time3">
        <template #default="countDown">
          {{ countDown.fullHours }}时{{ countDown.minutes }}分{{
            countDown.seconds
          }}秒
        </template>
      </ak-count-down>
    </ak-cell>
    <ak-cell label="毫秒" class="exp-countDown-box">
      <ak-count-down :initialTiming="time5">
        <template #default="countDown">
          {{ countDown.fullHours }}:{{ countDown.minutes }}:{{
            countDown.seconds
          }}.{{ countDown.milliseconds }}
        </template>
      </ak-count-down>
    </ak-cell>
    <ak-cell label="自定义风格" class="exp-countDown-box">
      <ak-count-down :initialTiming="time3">
        <template #default="countDown">
          <span class="exp-countDown-time-item">{{ countDown.fullHours }}</span
          ><span class="exp-countDown-time-item">{{ countDown.minutes }}</span
          ><span class="exp-countDown-time-item">{{ countDown.seconds }}</span>
        </template>
      </ak-count-down>
    </ak-cell>
  </ak-group>
  <ak-group title="时间监听">
    <ak-cell label="pause/resume/end" class="exp-countDown-box">
      <div class="exp-countDown-time-r">
        <ak-count-down
          :initialTiming="time4"
          @pause="onPause"
          @resume="onResume"
          @end="onEnd"
          ref="countDownRef"
        ></ak-count-down>
      </div>
      <ak-button @click="onSwitch" size="small">{{
        paused ? '恢复' : '暂停'
      }}</ak-button>
      <ak-button @click="onReset" size="small" type="danger"> 重置 </ak-button>
    </ak-cell>
  </ak-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  type CountDownOnEnd,
  type CountDownOnPause,
  type CountDownOnResume,
  type CountDownRef,
  showToast
} from '@/index'

export default defineComponent({
  name: 'ExpCountDown',
  setup() {
    const paused = ref(false)
    const countDownRef = ref<CountDownRef>()

    const onPause: CountDownOnPause = e => {
      console.log('pause', e)
      paused.value = true
      showToast('已暂停')
    }

    const onResume: CountDownOnResume = e => {
      console.log('resume', e)
      paused.value = false
      showToast('继续计时')
    }

    const onEnd: CountDownOnEnd = e => {
      console.log('end', e)
      showToast('计时结束')
    }

    function onSwitch() {
      if (paused.value) {
        countDownRef.value?.resume()
      } else {
        countDownRef.value?.pause()
      }
    }

    function onReset() {
      countDownRef.value?.reset(100 * 1000)
    }

    return {
      time: 300 * 1000,
      time2: 1.5 * 24 * 3600 * 1000,
      time3: 300 * 1000,
      time4: 100 * 1000,
      time5: 300 * 1000,
      paused,

      onPause,
      onResume,
      onEnd,
      countDownRef,
      onSwitch,
      onReset
    }
  }
})
</script>
