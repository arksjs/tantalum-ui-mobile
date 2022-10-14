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

export interface ImagePreviewProps extends PopupProps {
  urls: string[]
  current?: string
  showClose?: boolean
  navigationButtons?: boolean
  imageHighRendering?: boolean
}

export interface ImagePreviewEmits extends PopupEmits {
  onChange?: OnChange
}

export interface DistanceOptions {
  pageX: number
  pageY: number
}

export type { OnChange as ImagePreviewOnChange }
