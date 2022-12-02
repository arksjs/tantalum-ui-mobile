import { removeEl } from './dom'
import type { Noop } from './util'

/**
 * 监听元素大小变化
 * @param $el 被监听的元素
 * @param callback 回调函数
 * @returns 终止监听方法
 */
export function resizeDetector($el: HTMLElement, callback: Noop): Noop {
  // 监听
  const object = document.createElement('object') as any
  object.style.cssText =
    'display: block; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; border: none; padding: 0px; margin: 0px; opacity: 0; z-index: -1000; pointer-events: none; visibility: hidden;'
  object.tabIndex = -1
  object.type = 'text/html'
  object.setAttribute('aria-hidden', 'true')
  object.data = 'about:blank'
  object.onload = function () {
    if (!object.destroyed) {
      object.contentDocument.defaultView.addEventListener('resize', callback)
    }
  }

  $el.style.position = 'relative'
  $el.appendChild(object)

  return function off() {
    if (object.destroyed) {
      return
    }

    object.destroyed = true
    if (object.contentDocument) {
      object.contentDocument.defaultView.removeEventListener('resize', callback)
    }
    removeEl(object)
    $el.style.position = ''
  }
}
