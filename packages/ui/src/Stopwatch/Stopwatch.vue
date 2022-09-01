<template>
  <div class="fx-stopwatch">
    <slot
      :time="countTime.time"
      :days="countTime.days"
      :fullHours="countTime.fullHours"
      :thousandsFullHours="countTime.thousandsFullHours"
      :hours="countTime.hours"
      :minutes="countTime.minutes"
      :seconds="countTime.seconds"
      :milliseconds="countTime.milliseconds"
    >
      {{
        parseInt(countTime.fullHours) > 0
          ? (thousands ? countTime.thousandsFullHours : countTime.fullHours) +
            ':'
          : ''
      }}{{ countTime.minutes }}:{{ countTime.seconds
      }}{{ showMilliseconds ? '.' + countTime.milliseconds : '' }}
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { CountTime } from '../CountDown/types'
import { getCountTime } from '../CountDown/util'
import { useCountTime } from '../CountDown/use-count-time'
import { cloneData, returnTrue } from '../helpers/util'
import type { PropsToEmits } from '../helpers/types'
import type { StopwatchEmits } from './types'

export default defineComponent({
  name: 'fx-stopwatch',
  props: {
    // 是否显示毫秒数
    showMilliseconds: {
      type: Boolean,
      default: true
    },
    // 是否千分位显示
    thousands: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    start: returnTrue,
    reset: returnTrue,
    stop: payload => payload && payload.detail && Array.isArray(payload.laps)
  } as PropsToEmits<StopwatchEmits>,
  setup(props, { emit }) {
    let time = 0
    let startTime = 0
    let laps: CountTime[] = []

    const { times, timeStop, timeUpdate, timeStart } = useCountTime(
      ({ update }) => {
        time = Date.now() - startTime
        update(time)
      }
    )

    function doing() {
      return startTime > 0
    }

    function stop() {
      if (doing()) {
        const _laps = cloneData(laps)
        _laps.push(getNextLap())

        emit('stop', {
          detail: getCountTime(time),
          laps: _laps
        })

        startTime = 0
        timeStop()
      }
    }

    function start() {
      if (startTime === 0) {
        startTime = Date.now() - time
      }

      emit('start')

      timeStart()
    }

    function reset() {
      doing() && stop()

      emit('reset')

      time = 0
      laps = []
      timeUpdate(0)

      timeStop()
    }

    function getNextLap() {
      let totalTime = 0

      laps.forEach(({ time }) => {
        totalTime += time
      })

      return getCountTime(time - totalTime)
    }

    function lap(): CountTime[] {
      if (doing()) {
        laps.push(getNextLap())

        return cloneData(laps)
      }

      return []
    }

    timeUpdate(0)

    return {
      time,
      countTime: times,
      stop,
      start,
      reset,
      lap
    }
  }
})
</script>
