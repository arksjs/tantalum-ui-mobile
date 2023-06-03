import {
  computed,
  onMounted,
  watch,
  inject,
  provide,
  shallowRef,
  type SetupContext,
  ref
} from 'vue'
import { capitalize, type EmptyObject, isStringOrNumber } from '../helpers'
import { useGroup, useGroupItem } from '../hooks'
import type { ModelValue, OptionItem, CheckGroupCommonProps, CheckCommonProps } from './types'
import type { checkEmits } from './props'
import { getCheckClasses, getCheckGroupClasses, getCheckStyles } from './util'

interface GroupOptions {
  props: CheckGroupCommonProps & {
    modelValue: ModelValue | ModelValue[]
  }
  onChange: (uid: symbol) => void
}

interface GroupItem {
  uid: symbol
  getInputChecked: () => boolean
  getValue: () => number | string
  setChecked: (checked: boolean) => void
}

export function useCheck(
  props: CheckCommonProps,
  { emit }: SetupContext<typeof checkEmits>,
  name: string
) {
  const uid = Symbol()
  const groupOptions = inject<GroupOptions | null>(`ta${capitalize(name)}Options`, null)
  const inputEl = shallowRef<HTMLInputElement | null>(null)
  const checked = ref(false)

  const name2 = computed(() => {
    return groupOptions?.props.name || props.name || ''
  })
  const disabled2 = computed(() => {
    return groupOptions?.props.disabled ?? props.disabled
  })

  function getValue() {
    return props.checkedValue ?? ''
  }

  function getInputEl() {
    return inputEl.value as HTMLInputElement
  }

  function getInputChecked() {
    return !!getInputEl().checked
  }

  function setChecked(_checked = true) {
    checked.value = getInputEl().checked = _checked
  }

  function onChange(e: Event) {
    if (groupOptions) {
      groupOptions.onChange(uid)
    } else {
      checked.value = !!(e.target as HTMLInputElement).checked
      emit('update:checked', checked.value)
      emit('checkedChange', checked.value)
    }
  }

  watch(
    () => props.checked,
    val => {
      if (groupOptions) {
        return
      }

      const $input = getInputEl()
      const _checked = !!val

      if (_checked !== $input.checked) {
        checked.value = $input.checked = _checked
      }
    }
  )

  useGroupItem<EmptyObject, GroupItem>(name, {
    uid,
    getInputChecked,
    getValue,
    setChecked
  })

  onMounted(() => {
    const $input = getInputEl()

    let _checked: boolean
    if (groupOptions) {
      const groupValues = groupOptions.props.modelValue

      _checked =
        name === 'checkbox'
          ? !!(
              Array.isArray(groupValues) &&
              props.checkedValue &&
              groupValues.includes(props.checkedValue)
            )
          : props.checkedValue === groupValues
    } else {
      _checked = !!props.checked
    }

    if (_checked !== $input.checked) {
      checked.value = $input.checked = $input.defaultChecked = _checked
    }
  })

  const classes = computed(() => getCheckClasses(checked.value, disabled2.value))

  const styles = computed(() => {
    const { activeColor } = groupOptions?.props || props

    return getCheckStyles(activeColor)
  })

  return {
    inputEl,
    name2,
    disabled2,
    onChange,
    classes,
    styles,
    checked
  }
}

export function useCheckGroup<T>(
  props: CheckGroupCommonProps & {
    modelValue: T
  },
  {
    name,
    updateValue,
    watchValue
  }: {
    name: string
    updateValue: (options: {
      isChange: boolean
      children: GroupItem[]
      uid: symbol | undefined
    }) => T
    watchValue: (options: { children: GroupItem[]; value: T }) => void
  }
) {
  const root = shallowRef<HTMLElement | null>(null)
  const { children } = useGroup<EmptyObject, GroupItem>(name)

  function _updateValue(isChange: boolean, uid?: symbol) {
    return updateValue({ isChange, children, uid })
  }

  function onChange(uid: symbol) {
    _updateValue(true, uid)
  }

  watch(
    () => props.modelValue,
    value => {
      watchValue({ children, value })
    },
    {
      deep: true
    }
  )

  const options2 = computed(() => {
    const ret: OptionItem[] = []

    if (Array.isArray(props.options)) {
      props.options.forEach(v => {
        if (isStringOrNumber(v)) {
          ret.push({
            value: v,
            label: v.toString()
          })
        } else {
          ret.push({
            value: v.value,
            label: v.label.toString()
          })
        }
      })
    }

    return ret
  })

  onMounted(() => _updateValue(false))

  provide(`ta${capitalize(name)}Options`, {
    props,
    onChange
  })

  const classes = computed(() =>
    getCheckGroupClasses({
      inline: props.inline,
      disabled: props.disabled
    })
  )

  return {
    root,
    onChange,
    options2,
    classes
  }
}
