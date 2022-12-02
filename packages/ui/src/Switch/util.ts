import type { CSSProperties } from '../helpers'

export const getClasses = (disabled?: boolean) => {
  return ['ta-switch', { disabled: !!disabled }]
}

export const getStyles = (props: {
  color?: string
  activeColor?: string
  size?: number | string
}) => {
  const styles: CSSProperties = {}

  props.color && (styles['--ta-color'] = props.color)
  props.activeColor && (styles['--ta-active-color'] = props.activeColor)
  props.size != null &&
    props.size > 0 &&
    (styles['--ta-size'] = parseFloat(props.size as string) + 'px')

  return styles
}
