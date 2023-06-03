import type { Ref } from 'vue'
import { isNumber } from '../helpers'
import { useEvent } from './use-event'

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

/**
 * 绑定 scroll 事件
 * @param container scroll element
 * @param callback onScroll
 * @returns off fn
 */
export function useScroll(elRef: Ref<HTMLElement | null>, callback: EventListener) {
  return useEvent(elRef, 'scroll', callback)
}

export function useScrollTo(container: Ref<HTMLElement | null>) {
  /**
   * 滚动列表到指定的偏移（以像素为单位）
   * @param args 配置
   */
  const scrollToOffset: ScrollToOffset = (...args) => {
    let behavior: 'auto' | 'smooth' = 'smooth'
    let top = 0
    let left = 0

    if (isNumber(args[0])) {
      // x y
      left = args[0]
      isNumber(args[1]) && (top = args[1])
      behavior = 'auto'
    } else if (args[0]) {
      isNumber(args[0].x) && (left = args[0].x)
      isNumber(args[0].y) && (top = args[0].y)
      args[0].animated === false && (behavior = 'auto')
    }

    container.value?.scrollTo({
      top,
      left,
      behavior
    })
  }

  /**
   * 滚动到底部
   * @param param0 {x = true, y = true, animated = true }
   * @returns void
   */
  const scrollToEnd: ScrollToEnd = ({ x, y, animated } = {}) => {
    const $root = container.value

    if (!$root) {
      return
    }

    scrollToOffset({
      x: x !== false ? $root.scrollWidth : undefined,
      y: y !== false ? $root.scrollHeight : undefined,
      animated
    })
  }

  return {
    scrollToOffset,
    scrollToEnd
  }
}
