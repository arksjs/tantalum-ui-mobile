export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'fx-tab-bar_item',
    {
      active: index === activeIndex
    }
  ]
}
