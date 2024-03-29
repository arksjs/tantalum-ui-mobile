import type { ButtonGroupProps } from './types'
import { provide, inject } from 'vue'
import { useChildCountConsumer, useChildCountProvider } from '../hooks'

const KEY = 'Button'
const CONTEXT_KEY = `ta${KEY}GroupOptions`

export function useButtonProvider(props: ButtonGroupProps) {
  provide<ButtonGroupProps>(CONTEXT_KEY, props)

  return useChildCountProvider(KEY)
}

export function useButtonConsumer() {
  const groupOptions = inject<ButtonGroupProps | undefined>(CONTEXT_KEY, undefined)

  useChildCountConsumer(KEY)

  return {
    groupOptions
  }
}
