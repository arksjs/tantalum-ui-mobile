import type { CSSProperties } from '../helpers/types'

export const getStyles = (height?: number) => {
  const styles: CSSProperties = {}

  if (height != null) {
    styles.height = height + 'px'
  }

  return styles
}
