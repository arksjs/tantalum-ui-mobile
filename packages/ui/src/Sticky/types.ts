import type { Selector } from '../helpers'

export interface StickyProps {
  containSelector?: Selector
  offsetTop?: number | string
  offsetBottom?: number | string
  disabled?: boolean
}

export interface ResetContainer {
  (selector?: Selector): void
}

export interface StickyRef {
  resetContainer: ResetContainer
}
