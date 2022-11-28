import {
  getCurrentInstance,
  ref,
  onBeforeUnmount,
  provide,
  onMounted,
  onUnmounted,
  inject,
  shallowRef,
  type Ref
} from 'vue'
import { camelCase2KebabCase, capitalize, isSameArray } from '../helpers'
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
      $item._taSetIndex && $item._taSetIndex(index)
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

  provide(`ta${capitalize(name)}Update`, update)

  function getItems(): ListItemElement[] {
    return listEl.value
      ? [].slice.call(
          listEl.value.querySelectorAll(
            `.ta-${camelCase2KebabCase(name)}-item`
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
  _taSetIndex?(_index: number): void
}

export function useListItem(name: string, root?: Ref<ListItemElement | null>) {
  const { printItemIsolationWarn } = useException()
  const index = ref(-1)
  const update = inject(`ta${capitalize(name)}Update`, printItemIsolationWarn)

  onMounted(() => {
    if (root?.value) {
      root.value._taSetIndex = _index => (index.value = _index)
    }

    update()
  })
  onUnmounted(() => update())

  return {
    index,
    update
  }
}
