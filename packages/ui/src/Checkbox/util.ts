import type { CSSProperties } from '../helpers/types'

export const getCheckStyles = (activeColor?: string) => {
  const obj: CSSProperties = {}

  activeColor && (obj['--fx-active-color'] = activeColor)
  // size != null &&
  //   size > 0 &&
  //   (obj['--fx-size'] = parseFloat(size as string) + 'px')

  return obj
}

export const getCheckClasses = (disabled?: boolean) => [
  'fx-horizontal-hairline',
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
