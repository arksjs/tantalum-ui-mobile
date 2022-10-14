import type { IconData } from '../Icon/types'

export type ActiveName = string | number

export type OnChange = (activeNames: ActiveName[]) => void

export type ItemOnToggle = (payload: {
  name: ActiveName
  spread: boolean
}) => void

export interface CollapseProps {
  activeNames?: ActiveName | ActiveName[]
  accordion?: boolean
}

export interface CollapseEmits {
  onChange?: OnChange
}

export interface CollapseItemProps {
  icon?: IconData
  title?: string
  name: string | number
  disabled?: boolean
}

export interface CollapseItemEmits {
  onToggle?: ItemOnToggle
}

export type {
  ActiveName as CollapseActiveName,
  OnChange as CollapseOnChange,
  ItemOnToggle as CollapseItemOnToggle
}
