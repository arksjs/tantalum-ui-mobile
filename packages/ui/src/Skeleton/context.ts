import type { SkeletonProps } from './types'
import { provide, inject } from 'vue'

const KEY = 'Skeleton'
const CONTEXT_KEY = `ta${KEY}Options`

export function useProvider(props: SkeletonProps) {
  provide<SkeletonProps>(CONTEXT_KEY, props)

  return {}
}

export function useConsumer() {
  const parentOptions = inject<SkeletonProps>(CONTEXT_KEY, {})

  return parentOptions
}
