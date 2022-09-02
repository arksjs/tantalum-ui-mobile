export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'ak-tab-bar_item',
    {
      active: index === activeIndex
    }
  ]
}
