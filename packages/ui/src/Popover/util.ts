import {
  getEnumsValue,
  PLACEMENT_TYPES,
  cloneData,
  type CSSProperties,
  type PlacementType
} from '../helpers'

type PopoverPos = {
  t: number | null
  r: number | null
  b: number | null
  l: number | null
  at: number | null
  ar: number | null
  ab: number | null
  al: number | null
}

export const DEFAULT_POS: PopoverPos = {
  t: null,
  r: null,
  b: null,
  l: null,
  at: null,
  ar: null,
  ab: null,
  al: null
}

export const getDefaultPos = () => cloneData(DEFAULT_POS)

const padding = 8

export const getInnerStyles = (isShow: boolean, showPos: PopoverPos) => {
  const { clientWidth: dw, clientHeight: dh } = document.documentElement

  const styles: CSSProperties = {
    maxWidth: dw - padding * 2 + 'px',
    maxHeight: dh - padding * 2 + 'px'
  }

  if (!isShow) {
    return styles
  }

  showPos.t != null && (styles.top = showPos.t + 'px')
  showPos.r != null && (styles.right = showPos.r + 'px')
  showPos.b != null && (styles.bottom = showPos.b + 'px')
  showPos.l != null && (styles.left = showPos.l + 'px')

  return styles
}

export const getArrowStyles = (isShow: boolean, showPos: PopoverPos) => {
  if (!isShow) {
    return { left: '200vw', top: '200vh' } as CSSProperties
  }

  const styles: CSSProperties = {}

  showPos.at != null && (styles.top = showPos.at + 'px')
  showPos.ar != null && (styles.right = showPos.ar + 'px')
  showPos.ab != null && (styles.bottom = showPos.ab + 'px')
  showPos.al != null && (styles.left = showPos.al + 'px')

  return styles
}

export const getShowPos = (
  container: HTMLElement,
  innerEl: HTMLElement,
  _placement?: PlacementType
) => {
  const placement = getEnumsValue(PLACEMENT_TYPES, _placement)
  const rect = container.getBoundingClientRect()
  const { clientWidth: dw, clientHeight: dh } = document.documentElement

  const cssText = innerEl.style.cssText
  innerEl.style.cssText = ''
  innerEl.style.maxWidth = dw - padding * 2 + 'px'
  innerEl.style.maxHeight = dh - padding * 2 + 'px'
  const { clientWidth: iw, clientHeight: ih } = innerEl
  innerEl.style.cssText = cssText

  const pos = getDefaultPos()

  if (placement === 'top' || placement === 'bottom') {
    pos.al = rect.left + rect.width / 2 - 5
    pos.l = rect.left + rect.width / 2 - iw / 2

    if (pos.l < padding) {
      pos.l = padding
    } else if (pos.l + iw > dw - padding) {
      pos.l -= pos.l + iw - (dw - padding)
    }
    pos.al = pos.al - pos.l

    if (placement === 'bottom') {
      pos.at = -4
      pos.t = rect.bottom + 7
    } else {
      pos.ab = -4
      pos.b = dh - rect.top + 7
    }
  } else {
    pos.at = rect.top + rect.height / 2 - 5
    pos.t = rect.top + rect.height / 2 - ih / 2

    if (pos.t < padding) {
      pos.t = padding
    } else if (pos.t + ih > dh - padding) {
      pos.t -= pos.t + ih - (dh - padding)
    }
    pos.at = pos.at - pos.t

    if (placement === 'right') {
      pos.al = -4
      pos.l = rect.right + 7
    } else {
      pos.ar = -4
      pos.r = dw - rect.left + 7
    }
  }

  return pos
}
