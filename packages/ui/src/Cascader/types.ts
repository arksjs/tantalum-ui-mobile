import type { FormItemCommonProps, FocusWithoutEventEmits } from '../Form/types'
import type {
  PickerCommonProps,
  PickerPopupRef,
  PickerCommonEmits,
  UserFieldNames,
  UserOptionItem,
  PickerViewRef,
  PickerDetail
} from '../Picker/types'
import type { PopupEmits, PopupProps } from '../popup/types'

export type CascaderDetail = PickerDetail

export type OnSelect = (payload: CascaderDetail) => void
export type OnConfirm = (payload: CascaderDetail) => void

export interface CascaderOptionsProps {
  options: UserOptionItem[]
  fieldNames?: UserFieldNames
}

export interface ShowCascaderOptions extends CascaderOptionsProps {
  value?: (string | number)[]
}

/**
 * CascaderView
 */
export interface CascaderViewProps
  extends PickerCommonProps,
    CascaderOptionsProps {}

export interface CascaderViewEmits extends PickerCommonEmits {
  onSelect?: OnSelect
}

export type CascaderViewRef = PickerViewRef

/**
 * CascaderPopup
 */
export interface CascaderPopupProps
  extends PopupProps,
    PickerCommonProps,
    CascaderOptionsProps {}

export interface CascaderPopupEmits extends PopupEmits, PickerCommonEmits {
  onConfirm?: OnConfirm
}

export type CascaderPopupRef = PickerPopupRef

/**
 * Cascader
 */
export interface CascaderProps
  extends FormItemCommonProps,
    PickerCommonProps,
    CascaderOptionsProps {
  placeholder?: string
}

export interface CascaderEmits
  extends FocusWithoutEventEmits,
    PickerCommonEmits {}

export type {
  OnSelect as CascaderOnSelect,
  OnConfirm as CascaderOnConfirm,
  UserFieldNames as CascaderFieldNames
}

export type { SelectorOnChange as CascaderOnChange } from '../SelectorField/types'
