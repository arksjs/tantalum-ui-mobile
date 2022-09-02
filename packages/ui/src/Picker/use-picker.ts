import { nextTick, onMounted, ref, watch } from 'vue'
import type { SetupContext } from 'vue'
import { cloneData, isSameArray } from '../helpers/util'
import type {
  ColRow,
  OptionItem,
  PickerOptionsHandler,
  PickerHandlers,
  Col,
  PickerProps,
  PickerPopupEmits,
  PickerViewEmits,
  PickerViewProps,
  PickerPopupProps,
  PickerEmits,
  PickerViewRef
} from './types'
import type {
  SelectorValue,
  SelectorModelValue,
  SelectorDetail
} from '../SelectorField/types'
import {
  cloneDetail,
  isSameDetail,
  isSameValue,
  validateValues,
  getColRows,
  getFormatOptions,
  isValidValue
} from './util'
import type { PopupCustomConfirm } from '../popup/types'
import type { PropsToEmits } from '../helpers/types'

function getDefaultDetail(handlers: PickerHandlers) {
  return formatter([], [], handlers)
}

export function usePicker(
  props: Partial<PickerProps>,
  ctx: SetupContext<PropsToEmits<PickerEmits>>,
  {
    name,
    handlers
  }: {
    name: string
    handlers: PickerHandlers
  }
) {
  const root = ref<HTMLElement>()
  const { emit } = ctx
  const isInitPopup = ref(false)
  const popupVisible = ref(true)
  const fieldValue = ref('')
  const fieldLabel = ref('')
  const popup = ref()

  let detail = getDefaultDetail(handlers)

  function updateValue(val: unknown) {
    if (val == null) {
      // 解决 formily 强制null的问题
      return
    }

    if (!isValidValue(val)) {
      updateDetail(getDefaultDetail(handlers))
      return
    }

    if (!isSameValue(val, detail.value)) {
      // 如果value不同
      const { options, isCascade } = getFormatOptions(
        props.options || [],
        props.fieldNames || {},
        handlers.optionsHandler,
        name === 'cascader'
      )

      const { value, label, valid } = validateValues(
        parser(val, handlers),
        options,
        isCascade,
        handlers.optionsHandler
      )

      if (valid) {
        updateDetail(formatter(value, label, handlers))
      }
    }
  }

  function updateDetail(newDetail: SelectorDetail) {
    detail = newDetail

    fieldValue.value = detail.value != null ? detail.value.toString() : ''
    fieldLabel.value = detail.label
  }

  function onFieldClick() {
    if (!props.disabled) {
      if (!isInitPopup.value) {
        isInitPopup.value = true
      } else {
        popupVisible.value = true
      }
    }
  }

  function getDetail() {
    return cloneDetail(detail)
  }

  function onConfirm(newDetail: SelectorDetail) {
    if (!isSameDetail(newDetail, detail)) {
      updateDetail(newDetail)

      emit('update:modelValue', getDetail().value)
      emit('change', getDetail().value)
    }
  }

  watch(
    [() => props.modelValue, () => props.options],
    () => updateValue(props.modelValue),
    {
      deep: true,
      immediate: true
    }
  )

  watch([isInitPopup, popupVisible], ([isInit, visible]) => {
    if (isInit && visible) {
      emit('focus')
    } else if (!visible) {
      emit('blur')
    }
  })

  return {
    root,
    popup,
    isInitPopup,
    popupVisible,
    fieldValue,
    fieldLabel,
    onFieldClick,
    onConfirm
  }
}

export function usePickerPopup(
  props: Partial<PickerPopupProps>,
  { emit }: SetupContext<PropsToEmits<PickerPopupEmits>>,
  {
    customConfirm,
    onCancelClick
  }: {
    customConfirm: PopupCustomConfirm<SelectorDetail>
    onCancelClick: () => void
  },
  { handlers }: { handlers: PickerHandlers }
) {
  const viewRef = ref<PickerViewRef>()

  let detail = getDefaultDetail(handlers)

  function beforeConfirm() {
    const newDetail = getViewDetail()

    if (!isSameDetail(newDetail, detail)) {
      detail = newDetail

      // 跟picker-view不一样，改变数值时机是确定按钮
      emit('update:modelValue', getDetail().value)
      emit('change', getDetail().value)
    } else {
      detail = newDetail
    }

    return getDetail()
  }

  function onHeaderLeftClick() {
    onCancelClick()
  }

  function onHeaderRightClick() {
    customConfirm(beforeConfirm())
  }

  function getDetail() {
    return cloneDetail(detail)
  }

  function getViewDetail() {
    return viewRef.value?.getDetail() || getDefaultDetail(handlers)
  }

  watch(
    () => props.visible,
    val => {
      if (val && viewRef.value?.resize) {
        viewRef.value.resize()
      }
    }
  )

  watch(
    () => props.modelValue,
    val => {
      nextTick(() => {
        if (isValidValue(val)) {
          detail = getViewDetail()
        } else {
          // 主要是针对 pickerView 强制要求值得问题
          detail = getDefaultDetail(handlers)
        }
      })
    },
    {
      deep: true
    }
  )

  onMounted(() => {
    if (isValidValue(props.modelValue)) {
      detail = getViewDetail()
    }
  })

  return {
    viewRef,
    getDetail,
    onHeaderLeftClick,
    onHeaderRightClick
  }
}

interface ViewUseOptions {
  name: 'cascader' | 'picker'
  afterUpdate: (
    valueArray: SelectorValue[],
    labelArray: string[],
    cols: Col[]
  ) => void
  handlers: PickerHandlers
}

export function usePickerView(
  props: PickerViewProps,
  { emit }: SetupContext<PropsToEmits<PickerViewEmits>>,
  { name, afterUpdate, handlers }: ViewUseOptions
) {
  const cols = ref<Col[]>([])

  const options2 = ref<OptionItem[] | OptionItem[][]>([])
  const isCascade = ref(false)

  let selectedLabels: string[] = []
  let selectedValues: SelectorValue[] = []

  const currentLabels = ref<string[]>([])
  const currentValues = ref<SelectorValue[]>([])

  const isPicker = name === 'picker'

  const optionsHandler: PickerOptionsHandler | null =
    handlers.optionsHandler || null

  function updateOptions() {
    const { options, isCascade: isCascade2 } = getFormatOptions(
      props.options || [],
      props.fieldNames || {},
      optionsHandler,
      !isPicker
    )

    options2.value = options

    isCascade.value = isCascade2
  }

  function updateOriginalValue(val: SelectorValue[], forceUpdate = false) {
    const { valid, value: values } = validateValues(
      val,
      options2.value,
      isCascade.value,
      optionsHandler
    )

    if ((valid && !isSameArray(values, currentValues.value)) || forceUpdate) {
      update(values)

      currentLabels.value = values.length > 0 || isPicker ? selectedLabels : []
      currentValues.value = values.length > 0 || isPicker ? selectedValues : []
    }

    return getDetail()
  }

  function updateValue(val: unknown, forceUpdate = false) {
    return updateOriginalValue(parser(val, handlers), forceUpdate)
  }

  function getDetail() {
    return formatter(
      cloneData(currentValues.value),
      cloneData(currentLabels.value),
      handlers
    )
  }

  function addCache(item: { value: string | number; label: string }) {
    selectedValues.push(item.value)
    selectedLabels.push(item.label)
  }

  function update(selecteds: SelectorValue[]) {
    !isCascade.value ? updateCols(selecteds) : updateCascadeCols(selecteds)

    if (isPicker) {
      currentLabels.value = selectedLabels
      currentValues.value = selectedValues
    }

    afterUpdate(selectedValues, selectedLabels, cols.value)
  }

  function clearCache() {
    selectedLabels = []
    selectedValues = []
  }

  /**
   * 更新多列展示效果
   */
  function updateCols(selecteds: SelectorValue[]) {
    clearCache()

    const newCols: Col[] = []

    if (options2.value.length === 0) {
      cols.value = newCols
      return []
    }

    const options = (
      Array.isArray(options2.value[0]) ? options2.value : [options2.value]
    ) as OptionItem[][]

    options.forEach((subOptions, index) => {
      let hasSelected = false

      const rows: ColRow[] = []

      for (let i = 0; i < subOptions.length; i++) {
        const optionItem = subOptions[i]
        const row: ColRow = {
          value: optionItem.value,
          label: optionItem.label,
          hasChildren: false,
          indexes: [i],
          selected: false
        }

        if (optionItem.value == selecteds[index]) {
          hasSelected = true
          row.selected = true
          addCache(optionItem)
        }

        rows.push(row)
      }

      if (!hasSelected) {
        if (subOptions[0]) {
          rows[0].selected = true
          addCache(subOptions[0])
        }
      }

      newCols.push({
        key: index.toString(),
        rows
      })
    })
    cols.value = newCols

    return newCols
  }

  /**
   * 日期等更新模式
   * @param selecteds 选择值
   */
  function updateVirtualOptionsCols(selecteds: SelectorValue[]) {
    clearCache()

    if (selecteds.length === 0) {
      // 如果没有默认值，尝试获取默认值
      selecteds = getCascadeDefaultSelecteds()
    }

    const newCols: Col[] = []

    const getRows = optionsHandler as PickerOptionsHandler
    let colIndex = 0
    let rows = getRows(colIndex)
    let lastGroupSelected = false
    let key = ''
    let i = 0

    for (; i <= selecteds.length; i++) {
      const selected = selecteds[i]

      let nextParent: ColRow | null = null
      lastGroupSelected = false

      if (rows) {
        for (let j = 0; j < rows.length; j++) {
          const row = rows[j]

          if (selected != null && row.value === selected) {
            // 找到
            row.selected = true
            lastGroupSelected = true

            if (row.hasChildren) {
              nextParent = row
              colIndex++
            }

            addCache({
              label: row.label,
              value: row.value
            })
          }
        }

        newCols.push({
          key: `${i}-${key}`,
          rows
        })
      }

      if (!nextParent) {
        break
      } else {
        rows = getRows(colIndex, nextParent)
        key = nextParent.value.toString()
      }
    }

    if (isPicker && !lastGroupSelected) {
      const index = 0

      let lastColFirstRow: ColRow | null = rows[index]

      while (lastColFirstRow) {
        lastColFirstRow.selected = true
        addCache({
          label: lastColFirstRow.label,
          value: lastColFirstRow.value
        })
        i++

        if (lastColFirstRow.hasChildren) {
          colIndex++
          rows = getRows(colIndex, lastColFirstRow)
          newCols.push({
            key: `${i}-${lastColFirstRow.value.toString()}`,
            rows
          })

          lastColFirstRow = rows[0]
        } else {
          lastColFirstRow = null
        }
      }
    }
    cols.value = newCols

    return newCols
  }

  /**
   * 级联更新模式
   * @param selecteds 选择值
   */
  function updateCascadeCols(selecteds: SelectorValue[]) {
    if (typeof optionsHandler === 'function') {
      updateVirtualOptionsCols(selecteds)
      return
    }

    clearCache()

    const newCols: Col[] = []

    let optionList: OptionItem[] = options2.value as OptionItem[]

    if (optionList.length === 0) {
      cols.value = newCols
      return newCols
    }

    let rows = getColRows(optionList, [])

    if (selecteds.length === 0) {
      // 如果没有默认值，尝试获取默认值
      selecteds = getCascadeDefaultSelecteds()
    }

    let lastGroupSelected = false
    let key = ''
    let i = 0

    for (; i <= selecteds.length; i++) {
      const selected = selecteds[i]

      let nextParent: OptionItem | null = null
      let nextParentIndexes: number[] = []
      lastGroupSelected = false

      if (rows) {
        for (let j = 0; j < rows.length; j++) {
          const optionItem = optionList[j]
          const row = rows[j]

          if (selected != null && row.value === selected) {
            // 找到
            row.selected = true
            lastGroupSelected = true

            if (row.hasChildren) {
              nextParent = optionItem
              nextParentIndexes = row.indexes
            }

            addCache(optionItem)
          }
        }

        newCols.push({
          key: `${i}-${key}`,
          rows
        })
      }

      if (!nextParent) {
        break
      } else {
        optionList = nextParent.children
        rows = getColRows(optionList, [...nextParentIndexes])
        key = nextParent.value.toString()
      }
    }

    if (isPicker && !lastGroupSelected) {
      const index = 0

      let lastGroupFirstItem: OptionItem | null = optionList[index]

      while (lastGroupFirstItem) {
        const lastColFirstRow = rows[index]
        lastColFirstRow.selected = true
        addCache(lastGroupFirstItem)
        i++

        if (lastColFirstRow.hasChildren) {
          optionList = lastGroupFirstItem.children
          rows = getColRows(optionList, [...lastColFirstRow.indexes])
          newCols.push({
            key: `${i}-${lastColFirstRow.value.toString()}`,
            rows
          })

          lastGroupFirstItem = optionList[0]
        } else {
          lastGroupFirstItem = null
        }
      }
    }
    cols.value = newCols

    return newCols
  }

  /**
   * 非级联更新选择项
   */
  function updateColSelected(colIndex: number, current: number) {
    const newCol = cols.value[colIndex]

    newCol &&
      newCol.rows.forEach((row, index) => {
        if (index === current) {
          currentValues.value[colIndex] = row.value
          currentLabels.value[colIndex] = row.label
          row.selected = true
        } else {
          row.selected = false
        }
      })
  }

  /**
   * 获取默认选择数据
   * @summary 主要用于一些日期啥的，可以默认当天
   */
  function getCascadeDefaultSelecteds() {
    const selecteds = handlers.defaultValueGetter
      ? handlers.defaultValueGetter()
      : []

    if (selecteds.length > 0) {
      return selecteds
    }

    function getFirstSelected(
      values: SelectorValue[],
      optionList: OptionItem[]
    ): SelectorValue[] {
      const optionItem = optionList[0]

      if (optionItem) {
        values.push(optionItem.value)

        if (optionItem.children.length > 0) {
          return getFirstSelected(values, optionItem.children)
        }
      }

      return values
    }

    return !isPicker ? [] : getFirstSelected([], options2.value as OptionItem[])
  }

  function getValuesByRow(row: ColRow) {
    if (row.values) {
      return row.values as SelectorValue[]
    }

    const values: SelectorValue[] = []
    const indexes = row.indexes
    let i = 0
    let options = options2.value as OptionItem[]
    let optionItem = options[indexes[i]]

    while (options.length > 0 && i < indexes.length && optionItem) {
      values.push(optionItem.value)
      options = optionItem.children
      i++
      optionItem = options[indexes[i]]
    }

    return values
  }

  function onChange() {
    emit('update:modelValue', getDetail().value)
    emit('change', getDetail().value)
  }

  watch(
    [() => props.options, () => props.fieldNames],
    () => {
      updateOptions()
      updateOriginalValue(currentValues.value, true)
    },
    {
      deep: true,
      immediate: true
    }
  )

  watch(
    () => props.modelValue,
    val => updateValue(val),
    {
      deep: true,
      immediate: true
    }
  )

  // picker 要默认数据
  if (
    isPicker &&
    (!isValidValue(props.modelValue) ||
      !isSameValue(props.modelValue, currentValues.value))
  ) {
    // 如果传入的数据
    onChange()
  }

  return {
    cols,
    currentLabels,
    currentValues,
    isCascade,
    getDetail,
    update,
    updateColSelected,
    getValuesByRow,
    updateOriginalValue,
    onChange
  }
}

type PickerFormatter = (
  valueArray: SelectorValue[],
  labelArray: string[],
  handlers: PickerHandlers
) => SelectorDetail

type PickerParser = (
  value: unknown,
  handlers: PickerHandlers
) => SelectorValue[]

const formatter: PickerFormatter = (valueArray, labelArray, handlers) => {
  const defaultLabel = handlers.labelFormatter(labelArray)
  const ret = handlers.formatter(valueArray, labelArray)

  if ((ret as SelectorDetail)?.value != null) {
    return {
      value: (ret as SelectorDetail).value,
      label: (ret as SelectorDetail).label ?? ''
    }
  }

  return {
    value: ret as SelectorModelValue,
    label: defaultLabel
  }
}

const parser: PickerParser = (val, handlers) => {
  return handlers.parser(val)
}
