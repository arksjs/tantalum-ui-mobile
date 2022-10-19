import type { PopupEmits, PopupProps } from '../popup/types'

export type OnChange = (
  current: string,
  index: number,
  fromIndex: number
) => void

export interface ImageObject {
  src: string
  width: number
  height: number
  initialWidth: number
  initialHeight: number
  naturalWidth: number
  naturalHeight: number
  offsetTop: number
  offsetLeft: number
  loaded: boolean
}

interface CommonOptions {
  urls: string[]
  showClose?: boolean
  navigationButtons?: boolean
  imageHighRendering?: boolean
}

export interface ShowImagePreviewOptions extends CommonOptions {
  value?: string
}

export interface ImagePreviewProps extends PopupProps, CommonOptions {
  modelValue?: string
}

export interface ImagePreviewEmits extends PopupEmits {
  onChange?: OnChange
}

export interface DistanceOptions {
  pageX: number
  pageY: number
}

export type { OnChange as ImagePreviewOnChange }
