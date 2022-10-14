import type { FormItemCommonProps } from '../Form/types'
import type { ImageMode } from '../Image/types'

interface BeforeUploadHandlers {
  formatSize(size: number): string
}

export type Accept = 'all' | 'png' | 'jpeg' | 'jpg' | 'webp'
export type UploadStatus = 'reading' | 'uploading' | 'uploaded' | 'failed'

export interface UploadHandlers {
  getUploadId(): number
  formatSize(size: number): string
  setUploading(message: string): void
  fail(e?: string | Error): void
  success(url: string): void
}

export type BeforeUploadReturn = boolean | Promise<boolean | File> | void
export type BeforeUpload = (
  file: File,
  handlers: BeforeUploadHandlers
) => BeforeUploadReturn
export type UploadReady = (file: File, handlers: UploadHandlers) => void

export type OnDelete = (payload: {
  index: number
  item: {
    id: number
    status: UploadStatus
    url: string | null
  }
}) => void

export interface FileItem {
  id: number
  url?: string
  status: UploadStatus
  message: string
}

type OnChange = (value: string[]) => void

export interface ImageUploaderProps extends FormItemCommonProps {
  value?: string[]
  accept?: Accept | Accept[] // 允许上传的图片类型
  columnNumber?: number | string // 多少列展示
  maxCount?: number | string // 最大展示个数
  preview?: boolean // 点击图片预览全图
  multiple?: boolean // 支持多图片上传
  deletable?: boolean // 允许删除
  imageMode?: ImageMode // 图片填充模式
  beforeUpload?: BeforeUpload // 上传前处理函数，主要是判断大小，压缩等
  uploadReady?: UploadReady // 上传函数，在该函数内处理上传过程
}

export interface ImageUploaderEmits {
  onChange?: OnChange
  onDelete?: OnDelete
}

export type {
  Accept as ImageUploaderAccept,
  BeforeUpload as ImageUploaderBeforeUpload,
  UploadReady as ImageUploaderUploadReady,
  OnDelete as ImageUploaderOnDelete
}
