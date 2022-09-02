import type { IconData } from '../Icon/types'
import type { StateType } from '../helpers/types'

export type ButtonOption = {
  text: string
  icon?: IconData
  type?: StateType
}

export type OnTitleDbClick = (titleEl: HTMLElement) => void

export type OnButtonClick = (
  payload: {
    item: {
      text: string
    }
    index: number
  },
  buttonEl: HTMLElement
) => void

export interface NavBarProps {
  title?: string
  showBack?: boolean
  showHome?: boolean
  leftButtons?: ButtonOption[]
  rightButtons?: ButtonOption[]
  iconOnly?: boolean
}

export interface NavBarEmits {
  onBackClick?: OnButtonClick
  onHomeClick?: OnButtonClick
  onLeftButtonClick?: OnButtonClick
  onRightButtonClick?: OnButtonClick
  onTitleDbclick?: OnTitleDbClick
}
