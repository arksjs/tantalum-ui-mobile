export const getClasses = (isSelfContainer: boolean) => [
  'ak-sticky-view',
  {
    self: isSelfContainer
  }
]

export const getFixedStyles = (titleY: number | null) => ({
  transform: `translate3d(0px, ${
    titleY == null ? '-100%' : titleY + 'px'
  }, 0px)`
})

export const FIXED_HEIGHT = 28
