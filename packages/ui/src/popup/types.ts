import type { AnyObject, EmptyObject, Noop } from '../helpers/types'

export interface PopupProps {
  visible?: boolean
  maskClosable?: boolean
}

export interface PopupEmits {
  onUpdateVisible?: (visible: boolean) => void
  onVisibleStateChange?: OnVisibleStateChange
  onCancel?: OnCancel
  onConfirm?: (payload: any) => void
}

export interface PopupCustomCancel {
  (key: string, focus?: boolean): void
}
export interface PopupCustomConfirm<T = any> {
  (detail: T): void
}
export type PopupStyles = Partial<{
  zIndex: number
  top: string
  position: 'absolute'
}>
export type VisibleState = 'show' | 'shown' | 'hide' | 'hidden'
export type OnVisibleStateChange = (payload: { state: VisibleState }) => void
export type CancelArgs = { source: string }
export type OnCancel = (payload: { source: string }) => void

export interface PopupBridge {
  in?: (key: string, value?: any) => void
  out?: (key: string, value: any) => void
}
export type PopupHook = (hookEvent: string, args: any) => void

export interface PopupSuccessConfirmArgs<T = AnyObject> {
  confirm: boolean
  cancel: boolean
  detail: T
  source: string
}

export type PopupSuccessAlertArgs = EmptyObject

export interface PopupRef {
  customConfirm: PopupCustomConfirm
  customCancel: PopupCustomCancel
  onCancelClick: Noop
}

export type {
  VisibleState as PopupVisibleState,
  OnVisibleStateChange as PopupOnVisibleStateChange,
  OnCancel as PopupOnCancel
}
