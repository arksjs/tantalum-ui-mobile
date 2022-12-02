import type { CSSProperties } from '../helpers'

export const getIconStyles = (props: {
  size?: number | string
  width?: number | string
  height?: number | string
  color?: string
}) => {
  const styles: CSSProperties = {}

  props.color && (styles['--ta-icon-color'] = props.color)

  if (props.width && props.width > 0 && props.height && props.height > 0) {
    styles.width = props.width + 'px'
    styles.height = props.height + 'px'
  } else if (props.size && props.size > 0) {
    styles['--ta-icon-size'] = props.size + 'px'
  }

  return styles
}
