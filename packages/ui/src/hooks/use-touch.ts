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
  const object = {
    handleEvent(e: UseTouchEvent) {
      e.touchObject = getTouch(e)

      switch (e.type) {
        case touchstart:
          onTouchStart(e)
          break
        case touchmove:
          onTouchMove(e)
          break
        case touchend:
          onTouchEnd(e)
          break
        case 'mouseleave':
          onTouchEnd(e)
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
