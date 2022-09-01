<template>
  <fx-group title="基础用法">
    <div class="exp-stopwatch-box">
      <div class="exp-stopwatch-box-header">
        <fx-stopwatch
          @stop="onStop"
          @start="onStart"
          @reset="onReset"
          ref="stopWatch"
        ></fx-stopwatch>
      </div>
      <div class="exp-stopwatch-box-body">
        <fx-button @click="resetOrLap">
          {{ paused ? '重置' : '计次' }}
        </fx-button>
        <fx-button @click="startOrStop" :type="!paused ? 'danger' : 'success'">
          {{ paused ? '启动' : '停止' }}
        </fx-button>
      </div>
    </div>
    <fx-cell
      :label="'计次 ' + (laps.length - index)"
      v-for="(item, index) in laps"
      :key="item"
    >
      {{ item }}
    </fx-cell>
  </fx-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { CountTime, Stopwatch, StopwatchOnStop } from '@/index'

export default defineComponent({
  name: 'ExpStopwatch',
  setup() {
    const paused = ref(true)
    const laps = ref<string[]>([])
    const stopWatch = ref<InstanceType<typeof Stopwatch>>()

    const setLaps = (_laps: CountTime[] = []) => {
      laps.value = _laps.reverse().map(countTime => {
        return `${
          parseInt(countTime.fullHours) > 0
            ? countTime.thousandsFullHours + ':'
            : ''
        }${countTime.minutes}:${countTime.seconds}.${countTime.milliseconds}`
      })
    }

    const resetOrLap = () => {
      if (paused.value) {
        stopWatch.value?.reset()
        laps.value = []
      } else {
        setLaps(stopWatch.value?.lap())
      }
    }

    const startOrStop = () => {
      if (paused.value) {
        stopWatch.value?.start()
      } else {
        stopWatch.value?.stop()
      }
    }

    const onStop: StopwatchOnStop = e => {
      paused.value = true

      console.log('stop', e)

      setLaps(e.laps)
    }

    const onStart = () => {
      paused.value = false
    }

    const onReset = () => {
      paused.value = true
    }

    return {
      paused,
      laps,
      stopWatch,

      resetOrLap,
      startOrStop,
      onStart,
      onReset,
      onStop
    }
  }
})
</script>
