import {
  getCurrentInstance,
  ref,
  onBeforeUnmount,
  provide,
  onMounted,
  onUnmounted,
  inject,
  shallowRef
} from 'vue'
import type { Ref } from 'vue'
import { camelCase2KebabCase, capitalize, isSameArray } from '../helpers/util'
import { useException } from './use-exception'

type ListUpdateCallback = ($items: HTMLElement[]) => void

/**
 * useList
 * @param name eg: tabView
 * @param updateCallback 更新函数
 * @returns
 */
export function useList(name: string, updateCallback: ListUpdateCallback) {
  const instance = getCurrentInstance()
  const listEl = shallowRef<HTMLElement | null>(null)
  let updateTimer: number
  let _$items: ListItemElement[] = []

  function doUpdate() {
    const $items = getItems()

    $items.forEach(($item, index) => {
      $item._akSetIndex && $item._akSetIndex(index)
    })

    if (isSameArray(_$items, $items)) {
      // 如果发现是同样的，不在重复调用
      return
    }

    _$items = $items
    updateCallback($items)
  }

  function update() {
    if (instance?.isMounted && !instance?.isUnmounted) {
      doUpdate()
    }
  }

  provide(`ak${capitalize(name)}Update`, update)

  function getItems(): ListItemElement[] {
    return listEl.value
      ? [].slice.call(
          listEl.value.querySelectorAll(
            `.ak-${camelCase2KebabCase(name)}-item`
          ),
          0
        )
      : []
  }

  onBeforeUnmount(() => clearTimeout(updateTimer))

  return {
    listEl,
    getItems,
    update
  }
}

interface ListItemElement extends HTMLElement {
  _akSetIndex?(_index: number): void
}

export function useListItem(name: string, root?: Ref<ListItemElement | null>) {
  const { printItemIsolationWarn } = useException()
  const index = ref(-1)
  const update = inject(`ak${capitalize(name)}Update`, printItemIsolationWarn)

  onMounted(() => {
    if (root?.value) {
      root.value._akSetIndex = _index => (index.value = _index)
    }

    update()
  })
  onUnmounted(() => update())

  return {
    index,
    update
  }
}
