import type { SlideCommonProps } from '../Slider/types'

export interface RangeProps extends SlideCommonProps {
  value?: number[]
  allowSameValue?: boolean
}

type OnChange = (value: number[]) => void

export interface RangeEmits {
  onUpdateModelValue?: OnChange
  onInput?: OnChange
  onChange?: OnChange
}
