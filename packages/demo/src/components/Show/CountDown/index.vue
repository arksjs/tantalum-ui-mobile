<template>
  <ta-group title="基础用法">
    <ta-cell label="默认" class="exp-countDown-box">
      <ta-count-down :initialTiming="time"></ta-count-down>
    </ta-cell>
    <ta-cell label="显示天数" class="exp-countDown-box">
      <ta-count-down :initialTiming="time2" showDays></ta-count-down>
    </ta-cell>
  </ta-group>
  <ta-group title="Slot">
    <ta-cell label="中文显示" class="exp-countDown-box">
      <ta-count-down :initialTiming="time3">
        <template #default="countDown">
          {{ countDown.fullHours }}时{{ countDown.minutes }}分{{
            countDown.seconds
          }}秒
        </template>
      </ta-count-down>
    </ta-cell>
    <ta-cell label="毫秒" class="exp-countDown-box">
      <ta-count-down :initialTiming="time5">
        <template #default="countDown">
          {{ countDown.fullHours }}:{{ countDown.minutes }}:{{
            countDown.seconds
          }}.{{ countDown.milliseconds }}
        </template>
      </ta-count-down>
    </ta-cell>
    <ta-cell label="自定义风格" class="exp-countDown-box">
      <ta-count-down :initialTiming="time3">
        <template #default="countDown">
          <span class="exp-countDown-time-item">{{ countDown.fullHours }}</span
          ><span class="exp-countDown-time-item">{{ countDown.minutes }}</span
          ><span class="exp-countDown-time-item">{{ countDown.seconds }}</span>
        </template>
      </ta-count-down>
    </ta-cell>
  </ta-group>
  <ta-group title="时间监听">
    <ta-cell label="pause/resume/end" class="exp-countDown-box">
      <div class="exp-countDown-time-r">
        <ta-count-down
          :initialTiming="time4"
          @pause="onPause"
          @resume="onResume"
          @end="onEnd"
          ref="countDownRef"
        ></ta-count-down>
      </div>
      <ta-button @click="onSwitch" size="small">{{
        paused ? '恢复' : '暂停'
      }}</ta-button>
      <ta-button @click="onReset" size="small" type="danger"> 重置 </ta-button>
    </ta-cell>
  </ta-group>
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
      paused.value = false
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
