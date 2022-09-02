import { PLACEMENT_TYPES } from '../helpers/constants'
import type { CSSProperties } from '../helpers/types'
import { capitalize } from '../helpers/util'
import { getEnumsValue } from '../helpers/validator'
import type { SafeAreaInsets } from '../hooks/types'
import type { FixedProps } from './types'

export const getInnerClasses = (props: FixedProps, fixed: boolean) => {
  return [
    'ak-fixed_inner',
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
