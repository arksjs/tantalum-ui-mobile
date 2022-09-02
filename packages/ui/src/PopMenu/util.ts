import { isObject } from '../helpers/util'
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
    'ak-pop-menu_item',
    'ak-horizontal-hairline',
    { disabled: !!option.disabled, 'has--icon': !!option.icon }
  ]
}
