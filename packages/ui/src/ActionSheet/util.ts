import { cloneData, isObject } from '../helpers'
import type { Option } from './types'

export const getOptions = (options?: Option[]) => {
  const newOptions: Option[] = []

  if (Array.isArray(options)) {
    options.forEach(v => {
      newOptions.push(
        isObject(v)
          ? cloneData(v)
          : {
              name: v.toString()
            }
      )
    })
  }

  return newOptions
}

export const getItemClasses = (option: Option) => {
  return [
    'ta-action-sheet_item',
    'ta-horizontal-hairline',
    { disabled: !!option.disabled, highlight: !!option.highlight }
  ]
}
