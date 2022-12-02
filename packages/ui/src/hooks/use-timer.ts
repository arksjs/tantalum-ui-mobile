import { watchEffect, type Ref } from 'vue'
import { addTimer, type Noop } from '../helpers'

export const useTimer = (callback: Noop, interval: Ref<number>) => {
  let removeTimer: Noop

  watchEffect(onInvalidate => {
    removeTimer = addTimer(callback, interval.value ?? 1000)

    onInvalidate(() => {
      removeTimer && removeTimer()
    })
  })
}
