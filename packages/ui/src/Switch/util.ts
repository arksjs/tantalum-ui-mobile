import type { CSSProperties } from '../helpers/types'

export const getClasses = (disabled?: boolean) => {
  return ['ak-switch', { disabled: !!disabled }]
}

export const getStyles = (props: {
  color?: string
  activeColor?: string
  size?: number | string
}) => {
  const styles: CSSProperties = {}

  props.color && (styles['--ak-color'] = props.color)
  props.activeColor && (styles['--ak-active-color'] = props.activeColor)
  props.size != null &&
    props.size > 0 &&
    (styles['--ak-size'] = parseFloat(props.size as string) + 'px')

  return styles
}
