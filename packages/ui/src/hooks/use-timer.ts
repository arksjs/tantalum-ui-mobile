import { watchEffect } from 'vue'
import type { Ref } from 'vue'
import { addTimer } from '../helpers/timer'
import type { Noop } from '../helpers/types'

export const useTimer = (callback: Noop, interval: Ref<number>) => {
  let removeTimer: Noop

  watchEffect(onInvalidate => {
    removeTimer = addTimer(callback, interval.value ?? 1000)

    onInvalidate(() => {
      removeTimer && removeTimer()
    })
  })
}
