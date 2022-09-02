export const getClasses = (direction: string) => {
  return [
    'ak-swiper',
    {
      vertical: direction === 'y'
    }
  ]
}

export const getIndicatorsClasses = (direction: string) => {
  return [
    'ak-swiper_indicators',
    {
      vertical: direction === 'y'
    }
  ]
}

export const getPaginationItemClasses = (
  pageIndex: number,
  activeIndex: number
) => {
  return [
    'ak-swiper_indicator',
    {
      active: pageIndex === activeIndex
    }
  ]
}

export const getPaginationItemStyles = (
  {
    indicatorActiveColor,
    indicatorColor
  }: { indicatorActiveColor?: string; indicatorColor?: string },
  pageIndex: number,
  activeIndex: number
) => {
  return {
    background:
      pageIndex === activeIndex ? indicatorActiveColor : indicatorColor
  }
}
