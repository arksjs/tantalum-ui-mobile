import type { GroupContextValue, GroupContextItemRef } from '../hooks'
import type { Noop } from '../helpers'
import type { IconData } from '../Icon/types'

export type OnChange = (activeNames: string[]) => void

export type ItemOnToggle = (payload: { name: string; spread: boolean }) => void

export interface CollapseProps {
  modelValue?: string | string[]
  accordion?: boolean
}

export interface CollapseEmits {
  onChange?: OnChange
}

export interface CollapseItemProps {
  icon?: IconData
  title?: string
  name: string
  disabled?: boolean
}

export interface CollapseItemEmits {
  onToggle?: ItemOnToggle
}

export type { OnChange as CollapseOnChange, ItemOnToggle as CollapseItemOnToggle }

export interface CollapseContextValue extends GroupContextValue {
  onChange?: (uid: symbol) => void
}

export interface CollapseContextItemRef extends GroupContextItemRef {
  show: Noop
  hide: Noop
  getName: () => string
  getActive: () => boolean
}
