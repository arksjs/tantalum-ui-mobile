import { onBeforeUnmount, onMounted, watch, shallowRef, type Ref } from 'vue'
import {
  addEvent,
  touchEvent,
  addLongPressEvent,
  type LongPressEventCallback,
  type Noop
} from '../helpers'

type ElRef = Ref<HTMLElement | undefined | null>

function useFn(elRef: ElRef, fn: (el: HTMLElement) => Noop) {
  let stopHandle: Noop | null = null

  function on() {
    if (elRef.value) {
      stopHandle = fn(elRef.value)
    }
  }

  function off() {
    if (stopHandle) {
      stopHandle()
      stopHandle = null
    }
  }

  function elChange() {
    off()
    on()
  }

  watch(elRef, elChange)

  onMounted(on)
  onBeforeUnmount(off)

  return { off, elChange }
}

/**
 * 事件
 * @param elRef html element ref
 * @returns 取消函数
 */
export function useEvent(
  elRef: ElRef,
  event = touchEvent.touchstart,
  callback: EventListener
) {
  return useFn(elRef, el => addEvent(event, callback, el))
}

/**
 * 阻止冒泡
 * @param elRef html element ref
 * @returns 取消函数
 */
export function useStop(
  elRef: ElRef,
  event = touchEvent.touchstart,
  callback?: EventListener
) {
  const onStop: EventListener = e => {
    callback && callback(e)
    e.stopPropagation()
  }

  return useEvent(elRef, event, onStop)
}

/**
 * 单机、长按
 * @param elRef html element ref
 * @returns 取消函数
 */
export function useLongPress(elRef: ElRef, callback: LongPressEventCallback) {
  return useFn(elRef, el => addLongPressEvent(el, callback))
}

/**
 * 双击
 * @param elRef html element ref
 * @returns 取消函数
 */
export function useDbclick(
  elRef: ElRef,
  callback: ($el: HTMLElement, event: 'click' | 'dbclick') => void
) {
  let dbClickTag: string | null = null
  let dbClickTimer: number

  function onClick(e: Event) {
    const $el = e.currentTarget as HTMLElement

    if (!dbClickTag) {
      dbClickTag = e.type
      dbClickTimer = window.setTimeout(() => {
        dbClickTag = null
        callback($el, 'click')
      }, 300)
    } else if (dbClickTag === e.type) {
      clearTimeout(dbClickTimer)
      dbClickTag = null
      callback($el, 'dbclick')
    }
  }

  return useFn(elRef, el => {
    const off = addEvent(touchEvent.touchstart, onClick, el)

    return () => {
      clearTimeout(dbClickTimer)
      off()
    }
  })
}

export function useBlur(elRef: ElRef, callback: Noop) {
  const { off } = useEvent(elRef, touchEvent.touchend, callback)

  return { off }
}

export function useDocumentBlur(callback: Noop) {
  const elRef = shallowRef<HTMLElement | null>(null)

  onMounted(() => {
    elRef.value = document.documentElement
  })

  return useBlur(elRef, callback)
}
