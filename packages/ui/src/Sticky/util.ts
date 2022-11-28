import type { CSSProperties } from '../helpers'

export const getStyles = (height?: number) => {
  const styles: CSSProperties = {}

  if (height != null) {
    styles.height = height + 'px'
  }

  return styles
}
