<template>
  <fx-group title="基础用法">
    <fx-cell label="默认" class="exp-countDown-box">
      <fx-count-down :initialTiming="time"></fx-count-down>
    </fx-cell>
    <fx-cell label="显示天数" class="exp-countDown-box">
      <fx-count-down :initialTiming="time2" showDays></fx-count-down>
    </fx-cell>
  </fx-group>
  <fx-group title="Slot">
    <fx-cell label="中文显示" class="exp-countDown-box">
      <fx-count-down :initialTiming="time3">
        <template #default="countDown">
          {{ countDown.fullHours }}时{{ countDown.minutes }}分{{
            countDown.seconds
          }}秒
        </template>
      </fx-count-down>
    </fx-cell>
    <fx-cell label="毫秒" class="exp-countDown-box">
      <fx-count-down :initialTiming="time5">
        <template #default="countDown">
          {{ countDown.fullHours }}:{{ countDown.minutes }}:{{
            countDown.seconds
          }}.{{ countDown.milliseconds }}
        </template>
      </fx-count-down>
    </fx-cell>
    <fx-cell label="自定义风格" class="exp-countDown-box">
      <fx-count-down :initialTiming="time3">
        <template #default="countDown">
          <span class="exp-countDown-time-item">{{ countDown.fullHours }}</span
          ><span class="exp-countDown-time-item">{{ countDown.minutes }}</span
          ><span class="exp-countDown-time-item">{{ countDown.seconds }}</span>
        </template>
      </fx-count-down>
    </fx-cell>
  </fx-group>
  <fx-group title="时间监听">
    <fx-cell label="pause/resume/end" class="exp-countDown-box">
      <div class="exp-countDown-time-r">
        <fx-count-down
          :initialTiming="time4"
          @pause="onPause"
          @resume="onResume"
          @end="onEnd"
          ref="countDownRef"
        ></fx-count-down>
      </div>
      <fx-button @click="onSwitch" size="small">{{
        paused ? '恢复' : '暂停'
      }}</fx-button>
      <fx-button @click="onReset" size="small" type="danger"> 重置 </fx-button>
    </fx-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  CountDownOnEnd,
  CountDownOnPause,
  CountDownOnResume,
  CountDownRef,
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
