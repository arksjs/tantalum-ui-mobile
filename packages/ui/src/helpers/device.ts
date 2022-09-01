export const isBrowser = typeof window !== 'undefined'

export const isMobile = isBrowser
  ? /(iPhone|iPod|iPad|Android|ios)/i.test(navigator.userAgent) ||
    'ontouchstart' in document.documentElement
  : false

export const isIOS =
  isMobile && /(iPhone|iPod|iPad|ios)/i.test(navigator.userAgent)
