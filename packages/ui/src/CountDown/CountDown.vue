<template>
  <div class="ta-count-down">
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
        showDays
          ? countTime.days + locale.countDownDayUnit + ' ' + countTime.hours
          : countTime.fullHours
      }}:{{ countTime.minutes }}:{{ countTime.seconds }}
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useCountTime } from '../CountDown/use-count-time'
import { useLocale } from '../ConfigProvider/context'
import type { CountDownEmits, OnPauseOrResume, Reset } from './types'
import type { VoidFnToBooleanFn, PropsToEmits } from '../helpers/types'
import { isNumber } from '../helpers/util'

const pauseOrResumeValidator: VoidFnToBooleanFn<OnPauseOrResume> = payload =>
  payload && typeof payload.remainTime === 'number'

export default defineComponent({
  name: 'ta-count-down',
  props: {
    // 初始倒计时时间
    initialTiming: {
      type: Number,
      default: 0
    },
    // 是否显示天数
    showDays: {
      type: Boolean,
      default: false
    },
    // 是否暂停
    paused: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    end: payload =>
      payload && isNumber(payload.startTime) && isNumber(payload.endTime),
    pause: pauseOrResumeValidator,
    resume: pauseOrResumeValidator
  } as PropsToEmits<CountDownEmits>,
  setup(props, { emit, expose }) {
    const { locale } = useLocale()

    let startTime = 0
    let expiredTime = 0
    let remainTime = 0
    let paused = false

    const { times, timeStart, timeStop, timeUpdate } = useCountTime(
      ({ update, stop }) => {
        remainTime = expiredTime - Date.now()

        if (remainTime > 0) {
          update(remainTime)
        } else {
          remainTime = 0
          update(remainTime)
          emit('end', {
            startTime,
            endTime: expiredTime
          })

          stop()
        }
      }
    )

    function pause() {
      if (paused) {
        return
      }

      paused = true

      emit('pause', {
        remainTime
      })

      timeStop()
    }

    function resume() {
      if (!paused) {
        return
      }

      paused = false

      emit('resume', {
        remainTime
      })

      expiredTime = remainTime + Date.now()

      timeStart()
    }

    const reset: Reset = (_timing, autoStart = true) => {
      timeStop()

      paused = !autoStart

      startTime = Date.now()
      expiredTime = _timing + startTime
      remainTime = _timing

      timeUpdate(remainTime)
      !paused && timeStart()
    }

    onMounted(() => {
      if (props.initialTiming > 0) {
        reset(props.initialTiming, !paused)
      }
    })

    expose({
      pause,
      resume,
      reset
    })

    return {
      countTime: times,
      locale,
      pause,
      resume,
      reset
    }
  }
})
</script>
