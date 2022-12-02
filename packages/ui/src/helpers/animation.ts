import type { Noop } from './util'

type EasingType = 'linear' | 'swing'

type TaskRef = {
  idle: number | null
  id: number
  done: Noop
}

const Easing = {
  linear(p: number) {
    return p
  },
  swing(p: number) {
    return 0.5 - Math.cos(p * Math.PI) / 2
  }
}

let uid = 0

export class FrameTask {
  stop: () => boolean
  id: number

  constructor(ref: TaskRef, id: number) {
    this.stop = function () {
      if (ref.idle) {
        cancelAnimationFrame(ref.idle)
        ref.idle = null
        ref.done()
        return true
      }

      return false
    }

    this.id = id
  }
}

interface FrameProgressOption {
  (res: { current: number; frameIndex: number; id: number }): void
}

interface FrameCompleteOption {
  (res: { current: number; id: number }): void
}

export interface FrameOption {
  from: number
  to: number
  duration: number
  progress: FrameProgressOption
  complete?: FrameCompleteOption
  easing?: EasingType
}

/**
 * 变化解帧
 * @param options 设置项
 */
export function frameTo(options: FrameOption) {
  const { from, to, duration, progress, complete, easing } = options

  const start = Date.now()
  const end = start + duration
  const id = ++uid

  function done() {
    complete && complete({ current, id })
  }

  const ref: TaskRef = { idle: null, id, done }
  let frameIndex = 0
  let current = from

  function step() {
    ref.idle = requestAnimationFrame(function () {
      const t = Date.now()

      if (t >= end) {
        current = to

        progress({
          current,
          frameIndex: ++frameIndex,
          id
        })

        done()
      } else {
        const p = Easing[easing || 'swing']((t - start) / duration)
        current = from + (to - from) * p

        progress({
          current,
          frameIndex: ++frameIndex,
          id
        })

        step()
      }
    })
  }

  progress({
    current,
    frameIndex,
    id
  })

  step()

  return new FrameTask(ref, id)
}

export function getStretchOffset(offset: number) {
  return Math.ceil(offset / Math.log(Math.abs(offset)))
}
