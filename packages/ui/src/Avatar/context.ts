import type { AvatarGroupProps } from './types'
import { provide, inject } from 'vue'
import { useChildCountConsumer, useChildCountProvider } from '../hooks'

const KEY = 'Avatar'
const CONTEXT_KEY = `ta${KEY}GroupOptions`

export function useProvider(props: AvatarGroupProps) {
  provide<AvatarGroupProps>(CONTEXT_KEY, props)

  return useChildCountProvider(KEY)
}

export function useConsumer() {
  const groupOptions = inject<AvatarGroupProps | undefined>(
    CONTEXT_KEY,
    undefined
  )

  useChildCountConsumer(KEY)

  return {
    groupOptions
  }
}
