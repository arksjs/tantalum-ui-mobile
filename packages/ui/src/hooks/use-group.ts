import { capitalize } from '../helpers/util'
import { inject, onBeforeUnmount, provide, reactive } from 'vue'

function getKey(name: string) {
  return `ta${capitalize(name)}Group`
}

interface GroupProvide {
  addChild: (obj: unknown) => void
  removeChild: (obj: unknown) => void
}

export function useGroup<T = any>(
  name: string
): {
  children: any[]
} {
  const children = reactive<T[]>([])

  provide(getKey(name), {
    addChild(obj: any) {
      children.push(obj)
    },
    removeChild(obj: any) {
      children.splice(children.indexOf(obj), 1)
    }
  } as GroupProvide)

  return {
    children
  }
}

export function useGroupItem<T = any>(name: string, object: T) {
  const group = inject<GroupProvide | null>(getKey(name), null)

  group && (group as GroupProvide).addChild(object)

  onBeforeUnmount(() => {
    group && (group as GroupProvide).removeChild(object)
  })

  return {}
}
