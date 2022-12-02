import { isNumber, isString } from './util'

export function appendToBody($el: Element) {
  document.body.appendChild($el)
}

export function removeEl($el: Element) {
  $el.parentNode && $el.parentNode.removeChild($el)
}

export function addClassName($el: Element, className: string) {
  $el.classList.add(className)
}

export function removeClassName($el: Element, className: string) {
  $el.classList.remove(className)
}

export function hasClassName($el: Element, className: string) {
  return ([].slice.call($el.classList, 0) as string[]).includes(className)
}

export type ViewPosition = 'start' | 'center' | 'end' | 0 | 0.5 | 1

export function getViewPosition(viewPosition?: ViewPosition): 0 | 0.5 | 1 {
  const viewPositionMap = new Map<ViewPosition, 0 | 0.5 | 1>([
    ['start', 0],
    ['center', 0.5],
    ['end', 1],
    [0, 0],
    [0.5, 0.5],
    [1, 1]
  ])

  return viewPositionMap.get(viewPosition ?? 0) ?? 0
}

export function getRelativeOffset(
  $el: HTMLElement | Document,
  $relativeEl: Element | Document = document,
  viewPosition: ViewPosition = 0
) {
  if ($el === document) {
    return { offsetTop: 0, offsetLeft: 0 }
  }

  $el = $el as HTMLElement
  $relativeEl = (
    $relativeEl === document ? document.documentElement : $relativeEl
  ) as HTMLElement

  let offsetTop = $el.offsetTop
  let offsetLeft = $el.offsetLeft

  const transform = window.getComputedStyle($el).transform
  if (transform && transform !== 'none') {
    const transformMatrix = transform.slice(7, transform.length - 1).split(', ')
    offsetLeft += parseFloat(transformMatrix[4])
    offsetTop += parseFloat(transformMatrix[5])
  }

  if ($el.offsetParent && $el.offsetParent !== $relativeEl) {
    const parent = getRelativeOffset(
      $el.offsetParent as HTMLElement,
      $relativeEl
    )

    offsetTop += parent.offsetTop
    offsetLeft += parent.offsetLeft
  }

  const viewPosition2 = getViewPosition(viewPosition)

  if (viewPosition2) {
    if (viewPosition2 === 1) {
      offsetTop -= $relativeEl.clientHeight - $el.clientHeight
      offsetLeft -= $relativeEl.clientWidth - $el.clientWidth
    } else {
      offsetTop -= $relativeEl.clientHeight / 2 - $el.clientHeight / 2
      offsetLeft -= $relativeEl.clientWidth / 2 - $el.clientWidth / 2
    }
  }

  return { offsetTop, offsetLeft }
}

/**
 * 获取长度值
 * @param value eg: 10 10vw 10vh 10px
 * @param defaultValue
 */
export function getSizeValue(value: unknown, defaultValue = 0) {
  if (isNumber(value)) {
    return value
  } else if (isString(value)) {
    const matches = value.match(/^([\d.]+)((px)|(vw)|(vh)|)$/)

    if (matches) {
      let sizeNum = parseFloat(matches[1])

      if (matches[2] === 'vw') {
        sizeNum *= document.documentElement.clientWidth / 100
      } else if (matches[2] === 'vh') {
        sizeNum *= document.documentElement.clientHeight / 100
      }

      return sizeNum
    }
  }

  return defaultValue
}

export function isSizeValue(object: unknown): object is string | number {
  return getSizeValue(object, Infinity) !== Infinity
}

export type Selector = HTMLElement | string

/**
 * 指定条件获取 HTMLElement
 * @param selector 选择参数
 */
export function querySelector(selector: unknown) {
  let $el: HTMLElement | null = null

  if (selector instanceof HTMLElement) {
    $el = selector
  } else if (isString(selector) && selector.trim() !== '') {
    $el = document.querySelector(selector)
  } else if (selector === document) {
    $el = document.documentElement
  }

  return $el ?? null
}

function isPage(
  $el: HTMLElement | Document | Window
): $el is Document | Window {
  return (
    $el === document ||
    $el === document.documentElement ||
    $el === document.body ||
    $el instanceof Window
  )
}

export function getScrollTop($el: HTMLElement | Document | Window = document) {
  return isPage($el) ? window.pageYOffset : ($el as HTMLElement).scrollTop
}

export function scrollTo(
  $el: HTMLElement | Document | Window,
  scrollNumber: number | { top: number; left: number },
  animated = true
) {
  const options = Object.assign(
    {
      behavior: animated ? 'smooth' : 'auto'
    },
    isNumber(scrollNumber)
      ? {
          top: scrollNumber,
          left: 0
        }
      : scrollNumber
  ) as ScrollToOptions

  if (isPage($el)) {
    window.scrollTo(options)
  } else {
    $el.scrollTo(options)
  }
}

export function getParentTarget($el: HTMLElement, className: string) {
  while ($el) {
    if (hasClassName($el, className)) {
      return $el
    }

    $el = $el.parentElement as HTMLElement
  }

  return null
}
