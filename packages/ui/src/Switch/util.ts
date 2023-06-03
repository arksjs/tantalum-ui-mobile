import { getNumber, type CSSProperties } from '../helpers'

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
  getNumber(props.size) > 0 && (styles['--ta-size'] = getNumber(props.size) + 'px')

  return styles
}
