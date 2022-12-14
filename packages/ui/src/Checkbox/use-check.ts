import { computed, onMounted, watch, inject, provide, shallowRef } from 'vue'
import type { SetupContext } from 'vue'
import { capitalize, isStringOrNumber } from '../helpers'
import { useGroup, useGroupItem } from '../hooks'
import type {
  ModelValue,
  OptionItem,
  CheckGroupCommonProps,
  CheckCommonProps
} from './types'
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
  const groupOptions = inject<GroupOptions | null>(
    `ta${capitalize(name)}Options`,
    null
  )
  const inputEl = shallowRef<HTMLInputElement | null>(null)

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

  function setChecked(checked = true) {
    getInputEl().checked = checked
  }

  function onChange(e: Event) {
    if (groupOptions) {
      groupOptions.onChange(uid)
    } else {
      const checked = !!(e.target as HTMLInputElement).checked
      emit('update:checked', checked)
      emit('checkedChange', checked)
    }
  }

  watch(
    () => props.checked,
    val => {
      if (groupOptions) {
        return
      }

      const $input = getInputEl()
      const checked = !!val

      if (checked !== $input.checked) {
        $input.checked = checked
      }
    }
  )

  useGroupItem<GroupItem>(name, {
    uid,
    getInputChecked,
    getValue,
    setChecked
  })

  onMounted(() => {
    const $input = getInputEl()

    let checked: boolean
    if (groupOptions) {
      checked =
        name === 'checkbox'
          ? !!(
              Array.isArray(groupOptions.props.modelValue) &&
              props.checkedValue &&
              groupOptions.props.modelValue.includes(props.checkedValue)
            )
          : props.checkedValue === groupOptions.props.modelValue
    } else {
      checked = !!props.checked
    }

    if (checked !== $input.checked) {
      $input.checked = $input.defaultChecked = checked
    }
  })

  const classes = computed(() => getCheckClasses(disabled2.value))

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
    styles
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
  const { children } = useGroup<GroupItem>(name)

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
