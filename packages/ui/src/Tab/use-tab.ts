import {
  getCurrentInstance,
  ref,
  watch,
  computed,
  nextTick,
  shallowRef,
  type SetupContext,
  type ExtractPropTypes
} from 'vue'
import { isNumber, isObject, isString, isStringOrNumber, isURL } from '../helpers'
import { handleBadge } from '../Badge/util'
import type { OptionItem, HandleOptionItem } from './types'
import type { tabEmits, tabProps } from './props'
import { getStyles } from './util'
import { useFrameTask, useOnce, useException, useResizeObserver } from '../hooks'

interface UseOptions {
  tabName: string
}

export function useTab(
  props: ExtractPropTypes<typeof tabProps> & {
    scrollThreshold?: number
  },
  { emit, expose }: SetupContext<typeof tabEmits>,
  { tabName }: UseOptions
) {
  const { printNotInOptionsError } = useException()
  const instance = getCurrentInstance()
  const listEl = shallowRef<HTMLElement | null>(null)
  const underlineEl = shallowRef<HTMLElement | null>(null)
  const options2 = ref<HandleOptionItem[]>([])
  const activeIndex = ref(-1)
  const hasSub = ref(false)

  const { frameStart } = useFrameTask()

  let activeValue = props.modelValue ?? ''

  function updateOptions() {
    const options: HandleOptionItem[] = []

    let hasActive = false
    hasSub.value = false

    if (Array.isArray(props.options)) {
      props.options.forEach((item, index) => {
        let option: HandleOptionItem | null = null

        if (isNumber(item)) {
          option = {
            label: item.toString(),
            value: item as number
          }
        } else if (isString(item)) {
          option = {
            label: item,
            value: item
          }
        } else if (isObject(item)) {
          item = item as OptionItem

          if (isStringOrNumber(item.value)) {
            option = {
              label: isString(item.label) ? item.label : item.value.toString(),
              subLabel: isString(item.subLabel) ? item.subLabel : '',
              value: item.value,
              icon: null
            }

            if (item.icon) {
              if (isURL(item.icon)) {
                option.iconLink = item.icon as string
                option.activeIconLink = isURL(item.activeIcon)
                  ? (item.activeIcon as string)
                  : option.iconLink
              } else {
                option.icon = item.icon
                option.activeIcon = item.activeIcon ?? option.icon
              }
            }

            if (option.subLabel) {
              hasSub.value = true
            }

            option.badge = handleBadge(item.badge)
          }
        }

        if (option) {
          if (!hasActive && option.value === activeValue) {
            // 找到原来的value， activeValue 和 activeIndex 都正确
            activeIndex.value = index
            hasActive = true
          }

          options.push(option)
        }
      })
    }

    options2.value = options

    if (!hasActive) {
      if (options[0]) {
        // 设置为第一个
        activeIndex.value = 0
        activeValue = options[0].value
      } else {
        activeIndex.value = -1
        activeValue = ''
      }
      // 首次属于prop传进来的，不emit回去
      instance?.isMounted && emitChange()
    }

    updatePos()
  }

  function _switchTo(value: string | number, isProp = false) {
    if (value === activeValue) {
      return
    }

    if (!updateActive(value)) {
      printNotInOptionsError('index', isProp)
    } else if (!isProp) {
      // 设置modelValue不调用onChange
      emitChange()
    }
  }

  function switchToIndex(index: number) {
    if (index === activeIndex.value) {
      return
    }

    if (options2.value[index]) {
      onChange(options2.value[index].value)
    } else {
      printNotInOptionsError('index')
    }
  }

  function updateActive(value: string | number) {
    if (value === activeValue) {
      return true
    }

    let hasValue = false

    options2.value.forEach((option, index) => {
      if (option.value === value) {
        activeValue = option.value
        activeIndex.value = index
        hasValue = true
      }
    })

    hasValue && instance?.isMounted && updatePos()

    return hasValue
  }

  function onChange(value: string | number) {
    if (value === activeValue) {
      return
    }

    updateActive(value)
    emitChange()
  }

  function emitChange() {
    emit('update:modelValue', activeValue)
    emit('change', activeValue, activeIndex.value)
  }

  function updatePos() {
    nextTick(() => {
      if (!listEl.value) {
        return
      }
      const $list = listEl.value
      const $activeItem = $list.children[activeIndex.value] as HTMLElement
      if (!$activeItem) {
        if (tabName === 'Tab') {
          updateUnderline()
        }
        return
      }

      const vertical = tabName === 'SideTab'
      const sizeKey = !vertical ? 'Width' : 'Height'
      const directionKey = !vertical ? 'Left' : 'Top'
      const offsetSizeKey = ('offset' + sizeKey) as 'offsetWidth'
      const scrollSizeKey = ('scroll' + sizeKey) as 'scrollWidth'
      const offsetDirectionKey = ('offset' + directionKey) as 'offsetLeft'
      const scrollDirectionKey = ('scroll' + directionKey) as 'scrollLeft'

      const w = $list[offsetSizeKey]
      const ofs = $activeItem[offsetDirectionKey]
      const from = $list[scrollDirectionKey]
      const to =
        $activeItem[offsetSizeKey] > w
          ? ofs
          : Math.max(
              Math.min(ofs - (w - $activeItem[offsetSizeKey]) / 2, $list[scrollSizeKey] - w),
              0
            )

      // console.log(from, to, w, ofs, ofs - to)

      frameStart({
        from,
        to,
        duration: 100,
        progress({ current }) {
          $list[scrollDirectionKey] = current
        },
        complete({ current }) {
          $list[scrollDirectionKey] = current

          if (tabName === 'Tab') {
            updateUnderline()
          }
        }
      })
    })
  }

  const updateUnderlineOnce = useOnce(50)

  function updateUnderline() {
    updateUnderlineOnce(() => {
      const $activeItem = listEl.value?.querySelector('.active') as HTMLElement

      let x = 0
      let w = 0

      if ($activeItem) {
        const $inner = $activeItem.firstElementChild as HTMLElement

        x =
          $activeItem.offsetLeft -
          (listEl.value?.scrollLeft || 0) +
          ($activeItem.offsetWidth - $inner.offsetWidth) / 2
        w = $inner.offsetWidth
      }

      if (underlineEl.value) {
        underlineEl.value.style.width = w + 'px'
        underlineEl.value.style.transform = `translate3d(${x}px, 0, 0)`
      }
    })
  }

  if (tabName === 'Tab') {
    useResizeObserver(listEl, updateUnderline)
  }

  watch(
    () => props.modelValue,
    val => val != null && _switchTo(val, true)
  )

  watch(() => props.options, updateOptions, {
    deep: true,
    immediate: true
  })

  const styles = computed(() => getStyles(props.color, props.activeColor))

  const noScrolling = computed(() => {
    if (tabName === 'SideBar' || props.scrollThreshold == null) {
      return false
    }
    return options2.value.length <= props.scrollThreshold
  })

  const switchTo = (value: string | number) => _switchTo(value, false)

  expose({
    switchTo,
    switchToIndex
  })

  return {
    listEl,
    underlineEl,
    activeIndex,
    hasSub,
    options2,
    onChange,
    styles,
    updateUnderline,
    noScrolling,

    switchTo,
    switchToIndex
  }
}
