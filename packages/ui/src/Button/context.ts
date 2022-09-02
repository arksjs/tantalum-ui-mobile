import type { ButtonGroupProps } from './types'
import { provide, inject } from 'vue'
import {
  useChildCountConsumer,
  useChildCountProvider
} from '../hooks/use-child-count'

const KEY = 'Button'
const CONTEXT_KEY = `ak${KEY}GroupOptions`

export function useButtonProvider(props: ButtonGroupProps) {
  provide<ButtonGroupProps>(CONTEXT_KEY, props)

  return useChildCountProvider(KEY)
}

export function useButtonConsumer() {
  const groupOptions = inject<ButtonGroupProps | undefined>(
    CONTEXT_KEY,
    undefined
  )

  useChildCountConsumer(KEY)

  return {
    groupOptions
  }
}
