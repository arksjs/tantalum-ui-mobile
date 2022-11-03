import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { touchEvent } from '../helpers/events'

interface UseTouchEvent extends Event {
  touchObject: {
    pageX: number
    pageY: number
    clientX: number
    clientY: number
  }
  target: HTMLElement
}

interface UseOptions {
  el: Ref<HTMLElement | undefined | null>
  onTouchStart: (e: UseTouchEvent) => void
  onTouchMove: (e: UseTouchEvent) => void
  onTouchEnd: (e: UseTouchEvent) => void
  handleEvent?: (e: Event) => void
}

const {
  touchstart,
  touchmove,
  touchend,
  addListeners,
  removeListeners,
  getTouch
} = touchEvent

export function useTouch({
  el,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: UseOptions) {
  let isTouching = false

  const object = {
    handleEvent(e: UseTouchEvent) {
      e.touchObject = getTouch(e)

      switch (e.type) {
        case touchstart:
          isTouching = true
          onTouchStart(e)
          break
        case touchmove:
          isTouching && onTouchMove(e)
          break
        case touchend:
          if (isTouching) {
            isTouching = false
            onTouchEnd(e)
          }
          break
        case 'mouseleave':
          if (isTouching) {
            isTouching = false
            onTouchEnd(e)
          }
          break
        case 'dragstart':
          // 禁用拖拽事件
          e.preventDefault()
          break
        default:
          break
      }
    }
  }

  onMounted(() => addListeners((el as Ref<HTMLElement>).value, object))

  onBeforeUnmount(() => removeListeners((el as Ref<HTMLElement>).value, object))

  return {}
}
