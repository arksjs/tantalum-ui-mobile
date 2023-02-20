import { inject, onBeforeUnmount, provide, reactive } from 'vue'
import { capitalize, type AnyObject } from '../helpers'

export type GroupContextValue = {
  hasGroup: boolean
}

export type GroupContextItemRef = {
  uid: symbol
}

export type GroupContext = {
  hasGroup: boolean
  addItem: (obj: unknown) => void
  removeItem: (obj: unknown) => void
}

function getKey(name: string) {
  return `ta${capitalize(name)}Group`
}

export function useGroup<P extends AnyObject, T extends AnyObject>(
  name: string,
  values?: P
): {
  children: T[]
} {
  const children = reactive<T[]>([])

  provide(
    getKey(name),
    Object.assign(
      {
        hasGroup: true,
        addItem(obj: any) {
          children.push(obj)
        },
        removeItem(obj: any) {
          children.splice(children.indexOf(obj), 1)
        }
      },
      values || {}
    ) as GroupContext
  )

  return {
    children
  }
}

export function useGroupItem<P extends AnyObject, T extends AnyObject>(
  name: string,
  object: T
) {
  const group = inject<GroupContext | null>(getKey(name), null)

  group && group.addItem(object)

  onBeforeUnmount(() => {
    group && group.removeItem(object)
  })

  return (group || { hasGroup: false }) as P & GroupContext
}
