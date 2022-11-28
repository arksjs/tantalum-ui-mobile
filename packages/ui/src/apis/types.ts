import type { OnError, Noop } from '../helpers'

export interface ApiOptionsSuccess {
  (...args: any[]): void
}

export type ApiOptionsFail = OnError

export type ApiOptionsComplete = Noop
