import type { CSSProperties } from '../helpers/types'

export const getCheckStyles = (activeColor?: string) => {
  const obj: CSSProperties = {}

  activeColor && (obj['--ta-active-color'] = activeColor)
  // size != null &&
  //   size > 0 &&
  //   (obj['--ta-size'] = parseFloat(size as string) + 'px')

  return obj
}

export const getCheckClasses = (disabled?: boolean) => [
  'ta-horizontal-hairline',
  { disabled: !!disabled }
]

export const getCheckGroupClasses = ({
  inline,
  disabled
}: {
  inline?: boolean
  disabled?: boolean
}) => ({
  vertical: !inline,
  disabled: !!disabled
})
