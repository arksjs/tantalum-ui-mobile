import {
  PLACEMENT_TYPES,
  capitalize,
  getEnumsValue,
  type CSSProperties
} from '../helpers'
import type { SafeAreaInsets } from '../hooks'
import type { FixedProps } from './types'

export const getInnerClasses = (props: FixedProps, fixed: boolean) => {
  return [
    'ta-fixed_inner',
    'placement--' + getEnumsValue(PLACEMENT_TYPES, props.placement),
    { fixed }
  ]
}

export const getInnerStyles = (
  props: FixedProps,
  safeAreaInsets: SafeAreaInsets
) => {
  const styles: CSSProperties = {
    background: props.background
  }

  if (props.fixed) {
    if (props.enableSafeAreaInsets && safeAreaInsets.support) {
      const placement = getEnumsValue(PLACEMENT_TYPES, props.placement)
      styles[('padding' + capitalize(placement)) as 'paddingTop'] =
        safeAreaInsets[placement] + 'px'
    }

    styles.zIndex = props.zIndex
  }

  return styles
}

export const getStyles = ({
  width,
  height
}: {
  width: number | null
  height: number | null
}) => {
  return {
    width: width == null ? null : width + 'px',
    height: height == null ? null : height + 'px'
  } as CSSProperties
}
