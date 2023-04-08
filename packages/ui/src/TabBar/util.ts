export const getClasses = (noScrolling: boolean) => {
  return [
    'ta-tab-bar',
    'ta-horizontal-hairline',
    {
      'no--scrolling': noScrolling
    }
  ]
}

export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'ta-tab-bar_item',
    {
      active: index === activeIndex
    }
  ]
}
