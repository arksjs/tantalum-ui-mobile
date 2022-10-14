import type { PopupEmits, PopupProps, PopupRef } from '../popup/types'
import type { AnyObject, Noop } from '../helpers/types'
import type {
  SelectorValue,
  SelectorModelValue,
  SelectorDetail,
  SelectorValueParser,
  SelectorValueFormatter,
  SelectorOnChange
} from '../SelectorField/types'
import type { FocusWithoutEventEmits, FormItemCommonProps } from '../Form/types'

export interface UserFieldNames {
  label?: string
  value?: string
  children?: string
}
export interface FieldNames {
  label: string
  value: string
  children: string
}

export type UserOptionItem = string | number | AnyObject
export interface OptionItem {
  label: string
  value: string | number
  children: OptionItem[]
  disabled: boolean
}

export interface Col {
  key: string
  rows: ColRow[]
}

export interface ColRow {
  label: string
  value: string | number
  hasChildren: boolean
  indexes: number[]
  values?: SelectorValue[]
  disabled?: boolean
  selected?: boolean
}

export interface PickerOptionsHandler {
  (index: number, parent?: ColRow): ColRow[]
}
export interface DefaultValueGetter {
  (): SelectorValue[]
}
export interface PickerLabelFormatter {
  (labelArray: string[]): string
}
export interface PickerHandlers {
  optionsHandler?: PickerOptionsHandler
  defaultValueGetter?: DefaultValueGetter
  formatter: SelectorValueFormatter
  parser: SelectorValueParser
  labelFormatter: PickerLabelFormatter
}

export interface PickerDetail {
  value: (string | number)[]
  label: string
}

export type OnConfirm = (payload: PickerDetail) => void

/**
 * PickerCommon
 */
export interface PickerCommonProps {
  modelValue?: SelectorModelValue
  formatter?: SelectorValueFormatter
  parser?: SelectorValueParser
}

export interface PickerOptionsProps {
  options: UserOptionItem[] | UserOptionItem[][]
  fieldNames?: UserFieldNames
}

export interface PickerCommonEmits {
  onChange?: SelectorOnChange
}

export interface ShowPickerOptions extends PickerOptionsProps {
  title?: string
  value?: (string | number)[]
}

/**
 * PickerView
 */
export interface PickerViewProps
  extends PickerCommonProps,
    PickerOptionsProps {}

export type PickerViewEmits = PickerCommonEmits

export interface PickerViewRef {
  getDetail: () => SelectorDetail
  resize: Noop
}

/**
 * PickerPopup
 */
export interface PickerPopupProps
  extends PopupProps,
    PickerCommonProps,
    PickerOptionsProps {
  title?: string
}

export interface PickerPopupEmits extends PopupEmits, PickerCommonEmits {
  onConfirm?: OnConfirm
}

export interface PickerPopupRef extends PopupRef {
  getDetail: () => SelectorDetail
}

/**
 * Picker
 */
export interface PickerProps
  extends FormItemCommonProps,
    PickerCommonProps,
    PickerOptionsProps {
  placeholder?: string
}

export interface PickerEmits
  extends FocusWithoutEventEmits,
    PickerCommonEmits {}

export interface ScrollElement extends HTMLElement {
  scrolling?: boolean
  scrollTimer?: number
}

export type PickerViewAfterUpdate = (
  valueArray: readonly SelectorValue[],
  labelArray: readonly string[],
  cols: readonly Col[]
) => void

export type {
  OnConfirm as PickerOnConfirm,
  UserFieldNames as PickerFieldNames,
  SelectorOnChange as PickerOnChange
}
