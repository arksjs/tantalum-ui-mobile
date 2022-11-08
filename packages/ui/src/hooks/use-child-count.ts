import type { Noop } from '../helpers/types'
import { inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { capitalize } from '../helpers/util'

interface Options {
  addCount?: Noop
  minusCount?: Noop
}

function getContextKey(name: string) {
  return `ta${capitalize(name)}ChildCount`
}

export function useChildCountProvider(name: string) {
  const count = ref(0)

  provide<Options>(getContextKey(name), {
    addCount: () => count.value++,
    minusCount: () => count.value--
  })

  return {
    childCount: count
  }
}

export function useChildCountConsumer(name: string) {
  const consumer = inject<Options>(getContextKey(name), {})

  onMounted(() => {
    consumer.addCount && consumer.addCount()
  })

  onBeforeUnmount(() => consumer.minusCount && consumer.minusCount())

  return {}
}
