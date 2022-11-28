import type { CountTime } from '../CountDown/types'
import type { Noop } from '../helpers'

export type OnStop = (payload: { detail: CountTime; laps: CountTime[] }) => void

export interface StopwatchProps {
  showMilliseconds?: boolean
  thousands?: boolean
}

export interface StopwatchEmits {
  onStop?: OnStop
  onStart?: Noop
  onReset?: Noop
}

export interface StopwatchRef {
  start: Noop
  stop: Noop
  reset: Noop
  lap: () => CountTime[]
}

export type { OnStop as StopwatchOnStop }
