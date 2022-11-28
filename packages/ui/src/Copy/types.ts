import type { OnError } from '../helpers'

export interface CopyProps {
  text: string
}

export interface CopyEmits {
  onSuccess?: (text: string) => void
  onError?: OnError
}
