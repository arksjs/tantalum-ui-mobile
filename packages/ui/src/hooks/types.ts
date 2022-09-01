import type { UnionToIntersection } from '../helpers/types'

export type UseEmitFn<
  Options,
  Event extends keyof Options = keyof Options
> = UnionToIntersection<
  {
    [key in Event]: Options[key] extends (...args: infer Args) => any
      ? (event: key, ...args: Args) => void
      : (event: key, ...args: any[]) => void
  }[Event]
>

export interface ScrollToOffsetOptions {
  x?: number
  y?: number
  animated?: boolean
}

export interface ScrollToOffset {
  (xpos: number, ypos?: number): void
  (options: ScrollToOffsetOptions): void
}

export interface ScrollToEndOptions {
  x?: boolean
  y?: boolean
  animated?: boolean
}

export interface ScrollToEnd {
  (options: ScrollToEndOptions): void
}

export interface SafeAreaInsets {
  support: boolean
  top: number
  left: number
  right: number
  bottom: number
}
