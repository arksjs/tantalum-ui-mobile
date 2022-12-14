import { isObject } from '../helpers'
import type { Option } from './types'

export const getOptions = (options?: Option[]) => {
  const newOptions: Option[] = []

  if (Array.isArray(options)) {
    options.forEach(v => {
      newOptions.push(
        isObject(v)
          ? {
              icon: v.icon || undefined,
              name: v.name,
              disabled: !!v.disabled
            }
          : {
              icon: undefined,
              name: v.toString(),
              disabled: false
            }
      )
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
