import type { OnError } from '../helpers/types'

export interface CopyProps {
  text: string
}

export interface CopyEmits {
  onSuccess?: (text: string) => void
  onError?: OnError
}
