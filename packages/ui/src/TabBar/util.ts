export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'ta-tab-bar_item',
    {
      active: index === activeIndex
    }
  ]
}
