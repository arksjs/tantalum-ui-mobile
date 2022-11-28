import { onBeforeUnmount, ref } from 'vue'
import { getDefaultCountTime, getCountTime } from './util'
import type { Noop } from '../helpers'

interface StepHandlers {
  update: (time: number) => void
  start: Noop
  stop: Noop
}

export function useCountTime(onStep: (handlers: StepHandlers) => void) {
  const times = ref(getDefaultCountTime())

  function update(time: number) {
    times.value = getCountTime(time)
  }

  let timer: number

  function start() {
    stop()
    timer = requestAnimationFrame(() => {
      start()
      onStep({ update, start, stop })
    })
  }

  function stop() {
    cancelAnimationFrame(timer)
  }

  onBeforeUnmount(stop)

  return {
    times,
    timeStart: start,
    timeStop: stop,
    timeUpdate: update
  }
}
