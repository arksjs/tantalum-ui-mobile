import type { Option } from './types'

export const getOptions = (options?: Option[]) => {
  const newOptions: Option[] = []

  if (Array.isArray(options)) {
    options.forEach(v => {
      newOptions.push({
        icon: v.icon || undefined,
        name: v.name,
        disabled: !!v.disabled
      })
    })
  }

  return newOptions
}

export const getItemClasses = (option: Option) => {
  return [
    'ta-pop-menu_item',
    'ta-horizontal-hairline',
    { disabled: !!option.disabled, 'has--icon': !!option.icon }
  ]
}
