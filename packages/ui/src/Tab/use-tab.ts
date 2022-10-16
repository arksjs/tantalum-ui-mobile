import { getCurrentInstance, ref, watch, computed, nextTick } from 'vue'
import type { SetupContext, ExtractPropTypes } from 'vue'
import { isNumber, isObject, isStringNumberMix, isURL } from '../helpers/util'
import Exception from '../helpers/exception'
import { handleBadge } from '../Badge/util'
import type { OptionItem, HandleOptionItem } from './types'
import type { tabEmits, tabProps } from './tab'
import { getStyles } from './util'
import { useFrameTask } from '../hooks/use-frame-task'

interface UseOptions {
  tabName: string
}

export function useTab(
  props: ExtractPropTypes<typeof tabProps>,
  { emit, expose }: SetupContext<typeof tabEmits>,
  { tabName }: UseOptions
) {
  const instance = getCurrentInstance()
  const listEl = ref<HTMLElement>()
  const underlineEl = ref<HTMLElement>()
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
        } else if (typeof item === 'string') {
          option = {
            label: item,
            value: item
          }
        } else if (isObject(item)) {
          item = item as OptionItem

          if (isStringNumberMix(item.value)) {
            option = {
              label:
                typeof item.label === 'string'
                  ? item.label
                  : item.value.toString(),
              subLabel: typeof item.subLabel === 'string' ? item.subLabel : '',
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

  function switchTo(value: string | number, isProp = false) {
    if (value === activeValue) {
      return
    }

    if (!updateActive(value)) {
      console.error(
        new Exception(
          'The value is not in "options".',
          isProp ? Exception.TYPE.PROP_ERROR : Exception.TYPE.PARAM_ERROR,
          tabName
        )
      )
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
      console.error(
        new Exception(
          'The "options[index]" not found.',
          Exception.TYPE.PARAM_ERROR,
          tabName
        )
      )
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
      if (tabName === 'TabBar') {
        return
      }

      if (!listEl.value) {
        return
      }
      const $list = listEl.value
      const $activeItem = $list.children[activeIndex.value] as HTMLElement
      if (!$activeItem) {
        if (tabName === 'Tab') {
          setUnderline(0, 0)
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
              Math.min(
                ofs - (w - $activeItem[offsetSizeKey]) / 2,
                $list[scrollSizeKey] - w
              ),
              0
            )

      // console.log(from, to, w, ofs, ofs - to)

      frameStart({
        from,
        to,
        duration: 200,
        progress({ current }) {
          $list[scrollDirectionKey] = current
        },
        complete({ current }) {
          $list[scrollDirectionKey] = current
        }
      })

      if (tabName === 'Tab') {
        const $inner = $activeItem.firstElementChild as HTMLElement

        setUnderline(
          ofs - to + ($activeItem.offsetWidth - $inner.offsetWidth) / 2,
          $inner.offsetWidth
        )
      }
    })
  }

  function setUnderline(x: number, w: number) {
    if (underlineEl.value) {
      underlineEl.value.style.width = w + 'px'
      underlineEl.value.style.transform = `translate3d(${x}px, 0, 0)`
    }
  }

  watch(
    () => props.modelValue,
    val => val != null && switchTo(val, true)
  )

  watch(() => props.options, updateOptions, {
    deep: true,
    immediate: true
  })

  const styles = computed(() => getStyles(props.color, props.activeColor))

  expose({
    switchTo: (value: string | number) => switchTo(value, false),
    switchToIndex
  })

  return {
    listEl,
    underlineEl,
    activeIndex,
    hasSub,
    options2,
    onChange,
    styles
  }
}
