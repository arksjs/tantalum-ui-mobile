export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'ak-side-tab_item',
    {
      active: index === activeIndex,
      'active-prev': index === activeIndex - 1,
      'active-next': index === activeIndex + 1
    }
  ]
}
