import type { CSSProperties } from '../helpers'

export const getCheckStyles = (activeColor?: string) => {
  const obj: CSSProperties = {}

  activeColor && (obj['--ta-active-color'] = activeColor)
  // size != null &&
  //   size > 0 &&
  //   (obj['--ta-size'] = parseFloat(size as string) + 'px')

  return obj
}

export const getCheckClasses = (checked: boolean, disabled?: boolean) => [
  'ta-horizontal-hairline',
  { disabled: !!disabled, checked }
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
