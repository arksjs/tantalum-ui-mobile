import type {
  BadgeOption,
  BadgeProps as HandleBadgeOption
} from '../Badge/types'
import type { CSSProperties } from '../helpers/types'
import type { IconData } from '../Icon/types'

export interface OptionItem {
  label: string
  value: string | number
  icon?: string | IconData
  activeIcon?: string | IconData
  badge?: BadgeOption
  subLabel?: string
}

export type OptionList = (string | number | OptionItem)[]

export interface HandleOptionItem extends OptionItem {
  badge?: HandleBadgeOption
  iconLink?: string
  activeIconLink?: string
}

export type OnChange = (value: string | number, index: number) => void

export interface TabCommonProps {
  activeValue?: string | number
  options: OptionList
  color?: string
  activeColor?: string
  style?: CSSProperties
}

export interface TabCommonEmits {
  onChange?: OnChange
}

export interface TabProps extends TabCommonProps {
  scrollThreshold?: number
}

export type TabEmits = TabCommonEmits

export interface TabRef {
  switchTo: (value: string | number) => void
  switchToIndex: (index: number) => void
}

export type {
  OnChange as TabOnChange,
  OptionList as TabOptions,
  OptionItem as TabOption
}
