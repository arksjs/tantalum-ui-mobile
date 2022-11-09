import type { ConfigProviderProps } from './types'
import lang from '../locale'
import { inject, provide, computed } from 'vue'

const CONTEXT_KEY = 'taConfigProvider'

export function useConfigProvider(props: ConfigProviderProps) {
  provide(CONTEXT_KEY, props)
}

export function useLocale() {
  const props = inject<ConfigProviderProps>(CONTEXT_KEY, {})

  const locale = computed(() => {
    return props.locale ?? lang
  })

  return {
    locale
  }
}
