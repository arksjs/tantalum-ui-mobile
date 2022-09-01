import type { OnClick } from '../helpers/types'

export interface SuggestItem {
  text: string | number
  tags?: string[]
}

export type SuggestList = (string | number | SuggestItem)[]

export type SetSuggestList = (res: SuggestList) => void

export type OnInput = (text: string, setSuggestList: SetSuggestList) => void

export type OnSearch = (payload: { text: string; source: string }) => void

export type OnFieldClick = (payload: { text: string }) => void

export interface SearchBarProps {
  ghost?: boolean
  readonly?: boolean
  showCancel?: boolean
  focus?: boolean
  maxlength?: number
  background?: string
  placeholders?: string | string[]
  placeholderInterval?: number
}

export interface SearchBarEmits {
  onFocus?: OnInput
  onBlur?: OnInput
  onInput?: OnInput
  onCancelClick?: OnClick
  onSearch?: OnSearch
  onFieldClick?: OnFieldClick
}
