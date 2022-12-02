import type {
  UserFieldNames,
  UserOptionItem,
  PickerHandlers,
  FieldNames,
  PickerOptionsHandler,
  OptionItem,
  ColRow
} from './types'
import type {
  SelectorValue,
  SelectorModelValue,
  SelectorDetail,
  SelectorValueParser,
  SelectorValueFormatter
} from '../SelectorField/types'
import {
  cloneData,
  isDateArray,
  isSameArray,
  isSameDate,
  isNumber,
  isStringOrNumberArray,
  objectForEach,
  isObject,
  isStringOrNumber,
  isEmpty,
  type AnyObject,
  isString
} from '../helpers'

export const getDefaultFieldNames: () => FieldNames = () => {
  return { label: 'label', value: 'value', children: 'children' }
}

const labelFormatter = (labelArray: string[]) => {
  return labelArray.join('/')
}

const defaultFormatter: SelectorValueFormatter = (valueArray, labelArray) => {
  return {
    value: valueArray,
    label: labelFormatter(labelArray)
  }
}

const defaultParser: SelectorValueParser = value => {
  if (isNumber(value)) {
    return [value as number]
  } else if (isString(value) && value) {
    return [value]
  } else if (isStringOrNumberArray(value)) {
    return cloneValue(value as (string | number)[]) as SelectorValue[]
  }

  return []
}

export function mergeHandlers(...handlersArray: Partial<PickerHandlers>[]) {
  const handlers: PickerHandlers = {
    formatter: defaultFormatter,
    parser: defaultParser,
    labelFormatter
  }

  handlersArray.forEach(handlersItem => {
    objectForEach(handlersItem, (value, key) => {
      if (value) {
        // 规避 undefined 问题
        handlers[key as 'parser'] = value as SelectorValueParser
      }
    })
  })

  return handlers
}

export function getColRows(options: OptionItem[], indexes: number[]) {
  const rows: ColRow[] = []

  options.forEach((item, index) => {
    rows.push({
      label: item.label,
      value: item.value,
      hasChildren: item.children && item.children.length > 0,
      indexes: [...indexes, index]
    })
  })

  return rows
}

function parseOptions(
  options: UserOptionItem[] | UserOptionItem[][],
  fieldNames: FieldNames
) {
  const newOptions: OptionItem[] | OptionItem[][] = []

  if (Array.isArray(options)) {
    options.forEach(option => {
      if (Array.isArray(option)) {
        // 二维数组
        const subOptions = parseOptions(
          option as UserOptionItem[],
          fieldNames
        ) as OptionItem[]

        if (subOptions.length > 0) {
          ;(newOptions as OptionItem[][]).push(subOptions)
        }
      } else if (isStringOrNumber(option)) {
        // 纯数值或者字符串
        ;(newOptions as OptionItem[]).push({
          label: option.toString(),
          value: option as string,
          children: [],
          disabled: false
        })
      } else if (isObject(option)) {
        const newOption = option as AnyObject

        if (isStringOrNumber(newOption[fieldNames.value])) {
          ;(newOptions as OptionItem[]).push({
            label: (newOption[fieldNames.label] == null
              ? newOption[fieldNames.value]
              : newOption[fieldNames.label]) as string,
            value: newOption[fieldNames.value] as string,
            disabled: newOption.disabled ? true : false,
            children: parseOptions(
              newOption[fieldNames.children],
              fieldNames
            ) as OptionItem[]
          })
        }
      }
    })
  }

  return newOptions
}

interface ValidateReturn {
  valid: boolean
  value: SelectorValue[]
  label: string[]
}

/**
 * 非级联检查
 * @param values
 * @param options
 */
function validateCols(
  values: SelectorValue[],
  options: OptionItem[] | OptionItem[][]
): ValidateReturn {
  const optionList = Array.isArray(options[0])
    ? (options as OptionItem[][])
    : [options as OptionItem[]]
  let selectCount = 0
  const value: SelectorValue[] = []
  const label: string[] = []

  optionList.forEach((subOptionList, colIndex) => {
    for (let i = 0; i < subOptionList.length; i++) {
      const optionItem = subOptionList[i]

      if (optionItem.value == values[colIndex]) {
        selectCount++
        value.push(optionItem.value)
        label.push(optionItem.label)
        break
      }
    }
  })

  return selectCount === optionList.length
    ? {
        valid: true,
        value,
        label
      }
    : {
        valid: false,
        value: [],
        label: []
      }
}

/**
 * 级联检查
 * @param values
 * @param options
 */
function validateCascadeCols(
  values: SelectorValue[],
  options: OptionItem[],
  virtualHandler?: PickerOptionsHandler | null
): ValidateReturn {
  const value: SelectorValue[] = []
  const label: string[] = []

  function addData(optionItem: OptionItem) {
    value.push(optionItem.value)
    label.push(optionItem.label)
  }

  function deep(
    optionList: OptionItem[],
    valueIndex: number,
    indexes: number[]
  ): boolean {
    const rows = getColRows(optionList, indexes)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const optionItem = optionList[i]

      if (row.value === values[valueIndex]) {
        if (row.hasChildren && values[valueIndex + 1]) {
          // 都有下一项
          addData(optionItem)
          return deep(optionItem.children, valueIndex + 1, [...indexes, i])
        } else if (!row.hasChildren && valueIndex + 1 >= values.length) {
          // 都没有下一项，匹配正确
          addData(optionItem)
          return true
        } else {
          return false
        }
      }
    }

    return false
  }

  function virtualOptionsDeep(
    index: number,
    valueIndex: number,
    parent?: ColRow
  ): boolean {
    function row2OptionItem(row: ColRow) {
      return {
        label: row.label,
        value: row.value,
        children: [],
        disabled: false
      }
    }

    const rows = (virtualHandler as PickerOptionsHandler)(index, parent)

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      const optionItem = row2OptionItem(row)

      if (row.value === values[valueIndex]) {
        // 之前value[valueIndex + 1] 没有考虑0的情况
        if (row.hasChildren && valueIndex + 1 < values.length) {
          // 都有下一项
          addData(optionItem)
          return virtualOptionsDeep(index + 1, valueIndex + 1, row)
        } else if (!row.hasChildren && valueIndex + 1 >= values.length) {
          // 都没有下一项，匹配正确
          addData(optionItem)
          return true
        } else {
          return false
        }
      }
    }

    return false
  }

  return (virtualHandler ? virtualOptionsDeep(0, 0) : deep(options, 0, []))
    ? {
        valid: true,
        value,
        label
      }
    : {
        valid: false,
        value: [],
        label: []
      }
}

/**
 * 校验值
 * @param values 值
 * @param options
 * @param isCascade
 * @param virtualHandler
 * @returns { valid, detail }
 */
export function validateValues(
  values: SelectorValue[],
  options: OptionItem[] | OptionItem[][],
  isCascade: boolean,
  virtualHandler?: PickerOptionsHandler | null
): ValidateReturn {
  let valid = false

  if (values.length === 0) {
    // 空数组也算符合
    valid = true
  } else {
    const ret = isCascade
      ? validateCascadeCols(values, options as OptionItem[], virtualHandler)
      : validateCols(values, options)
    if (!ret.valid) {
      // 不再提示错误，解决切换选项后未及时更新value导致的问题
      // printError('The value is not in "options".')
    } else {
      return ret
    }
  }

  return {
    valid,
    value: [],
    label: []
  }
}

export function getFormatOptions(
  options: UserOptionItem[] | UserOptionItem[][],
  fieldNames: UserFieldNames,
  virtualHandler: PickerOptionsHandler | null | undefined,
  cascader = false
) {
  const newFieldNames = getDefaultFieldNames()

  let newOptions: OptionItem[] | OptionItem[][] = []
  let isCascade = false

  if (virtualHandler == null) {
    if (fieldNames) {
      isString(fieldNames.label) &&
        fieldNames.label &&
        (newFieldNames.label = fieldNames.label)
      isString(fieldNames.value) &&
        fieldNames.value &&
        (newFieldNames.value = fieldNames.value)
      isString(fieldNames.children) &&
        fieldNames.children &&
        (newFieldNames.children = fieldNames.children)
    }

    newOptions = parseOptions(options, newFieldNames)

    // 判断是否级联模式
    if (cascader) {
      // 级联选择器下强制级联模式
      isCascade = true
    } else {
      for (let i = 0; i < newOptions.length; i++) {
        const newOption = newOptions[i] as OptionItem

        if (newOption.children && newOption.children[0]) {
          isCascade = true
          break
        }
      }
    }
  } else {
    isCascade = true
  }

  return {
    options: newOptions,
    isCascade,
    fieldNames: newFieldNames
  }
}

export function isSameValue(aVal: unknown, bVal: unknown) {
  if (Array.isArray(aVal) && Array.isArray(bVal)) {
    return isSameArray(aVal, bVal)
  }

  if (aVal instanceof Date && bVal instanceof Date) {
    return isSameDate(aVal, bVal)
  }

  return aVal === bVal
}

export function isSameDetail(a: SelectorDetail, b: SelectorDetail) {
  return isSameValue(a.value, b.value)
}

export function cloneValue<T extends SelectorModelValue>(value: T) {
  if (value instanceof Date) {
    return new Date(value)
  } else if (isDateArray(value)) {
    const newValue: Date[] = []
    ;(value as Date[]).forEach(date => {
      newValue.push(new Date(date))
    })
    return newValue
  }

  return cloneData(value)
}

export function cloneDetail<T extends SelectorDetail>(detail: T) {
  const newDetail = cloneData(detail)

  newDetail.value = cloneValue(detail.value)
  if (detail.source) {
    newDetail.source.value = cloneValue(detail.source.value)
  }

  return newDetail
}

export const DEFAULT_ITEM_HEIGHT = 48

export function isValidValue(value: unknown): value is SelectorModelValue {
  return !isEmpty(value) || value === 0
}
