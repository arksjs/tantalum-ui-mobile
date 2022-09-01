import type { Noop } from '../helpers/types'
import { getCurrentInstance, onMounted } from 'vue'

export function useMounted(callback: Noop) {
  const instance = getCurrentInstance()

  if (instance) {
    if (instance.isMounted) {
      callback()
    } else {
      onMounted(() => callback())
    }
  }
}
