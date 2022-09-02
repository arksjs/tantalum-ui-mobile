import type { AvatarGroupProps } from './types'
import { provide, inject } from 'vue'
import {
  useChildCountConsumer,
  useChildCountProvider
} from '../hooks/use-child-count'

const KEY = 'Avatar'
const CONTEXT_KEY = `ak${KEY}GroupOptions`

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
