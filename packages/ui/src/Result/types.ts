import type { OnClick } from '../helpers'

export type ResultType = 'info' | 'warning' | 'success' | 'fail'

export interface ResultProps {
  type?: ResultType
  title?: string
  description?: string
  backText?: string
  confirmText?: string
  showBack?: boolean
}

export interface ResultEmits {
  onConfirm?: OnClick
  onBack?: OnClick
}
