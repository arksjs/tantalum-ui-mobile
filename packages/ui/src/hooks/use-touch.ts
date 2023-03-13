import { touchEvent } from '../helpers'

interface UseTouchEvent extends UIEvent {
  touchObject: {
    pageX: number
    pageY: number
    clientX: number
    clientY: number
  }
  target: HTMLElement
  touchTargetElement: HTMLElement
  touchCurrentElement: HTMLElement
}

const getTouch = touchEvent.getTouch
const isTouchEvent = touchEvent.touchstart === 'touchstart'

export function useTouch({
  onStart,
  onMove,
  onEnd
}: {
  onStart: (e: UseTouchEvent) => void
  onMove: (e: UseTouchEvent) => void
  onEnd: (e: UseTouchEvent) => void
}) {
  let isTouching = false

  function getUseEvent(e: UIEvent) {
    ;(e as UseTouchEvent).touchObject = getTouch(e)
    e.currentTarget instanceof HTMLElement &&
      ((e as UseTouchEvent).touchCurrentElement = e.currentTarget)
    e.target instanceof HTMLElement &&
      ((e as UseTouchEvent).touchTargetElement = e.target)
    return e as UseTouchEvent
  }

  /**
   * 是否允许被调用
   * @param type 事件类型
   * @returns boolean
   */
  function allowCallback(type: string) {
    return (
      (isTouchEvent && type.indexOf('touch') === 0) ||
      (!isTouchEvent && type.indexOf('mouse') === 0)
    )
  }

  function onTouchStart(e: UIEvent) {
    isTouching = true
    allowCallback(e.type) && onStart(getUseEvent(e))
  }

  function onTouchMove(e: UIEvent) {
    isTouching && allowCallback(e.type) && onMove(getUseEvent(e))
  }

  function onTouchEnd(e: UIEvent) {
    if (isTouching) {
      isTouching = false
      allowCallback(e.type) && onEnd(getUseEvent(e))
    }
  }

  function onDragStart(e: UIEvent) {
    // 禁用拖拽事件
    e.preventDefault()
  }

  return {
    // touchstart/mousedown,
    onTouchStart,
    // touchmove/mousemove
    onTouchMove,
    // touchend/mouseup/mouseleave
    onTouchEnd,
    // dragstart
    onDragStart
  }
}
