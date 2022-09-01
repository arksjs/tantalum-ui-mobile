import {
  getCurrentInstance,
  ref,
  onBeforeUnmount,
  provide,
  onMounted,
  onUnmounted,
  inject
} from 'vue'
import type { Ref } from 'vue'
import Exception from '../helpers/exception'
import { camelCase2KebabCase, capitalize } from '../helpers/util'

type ListUpdateCallback = ($items: HTMLElement[]) => void

/**
 * 创建默认更新方法，带错误提示
 * @param name 横杆形式
 */
export function createUpdateInItem(name: string) {
  name = capitalize(name)

  return function (lazy = 17) {
    new Exception(`${name}Item is not in ${name}`, Exception.TYPE.DEFAULT, name)
  }
}

/**
 * useList
 * @param name eg: tabView
 * @param updateCallback 更新函数
 * @returns
 */
export function useList(name: string, updateCallback: ListUpdateCallback) {
  const instance = getCurrentInstance()
  const listEl = ref<HTMLElement>()
  let updateTimer: number

  function doUpdate() {
    const $items = getItems()

    $items.forEach(($item, index) => {
      $item._fxSetIndex && $item._fxSetIndex(index)
    })

    updateCallback($items)
  }

  function update(lazy = 17) {
    if (!instance?.isMounted) {
      return
    }

    if (lazy === 0) {
      if (!instance?.isUnmounted) {
        doUpdate()
      }
    } else {
      clearTimeout(updateTimer)
      updateTimer = window.setTimeout(() => {
        if (!instance?.isUnmounted) {
          doUpdate()
        }
      }, lazy)
    }
  }

  provide(`fx${capitalize(name)}Update`, update)

  function getItems(): ListItemElement[] {
    return listEl.value
      ? [].slice.call(
          listEl.value.querySelectorAll(
            `.fx-${camelCase2KebabCase(name)}-item`
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
  _fxSetIndex?(_index: number): void
}

export function useListItem(
  name: string,
  root?: Ref<ListItemElement | undefined>
) {
  const index = ref(-1)
  const update = inject(`fx${capitalize(name)}Update`, createUpdateInItem(name))

  onMounted(() => {
    if (root?.value) {
      root.value._fxSetIndex = _index => (index.value = _index)
    }

    update()
  })
  onUnmounted(() => update())

  return {
    index,
    update
  }
}
