/**
 * 格式化输入值为数字
 * @param value 值
 * @param decimalLength 小数位
 */
export function formatInputNumber(
  value: string | number,
  decimalLength = -1
): string {
  if (value == null || value === '') {
    return ''
  }

  const isNegative = value.toString().indexOf('-') === 0

  const match = value.toString().match(/[\d-.]+/)

  if (match && match[0]) {
    value = match[0].replace(/\.+/g, '.').replace(/-+/g, '')

    if (decimalLength > 0) {
      const arr = value.split('.')
      if (arr[1] && arr[1].length > decimalLength) {
        arr[1] = arr[1].substring(0, decimalLength)
        value = arr.join('.')
      }
    } else if (decimalLength === 0) {
      value = parseInt(value).toString()
    }

    return (isNegative ? '-' : '') + value
  }

  return ''
}

/**
 * 格式化输入值为整数(0-9)
 * @param value 值
 */
export function formatInputDigit(value: string | number): string {
  if (value == null || value === '') {
    return ''
  }

  const match = value.toString().match(/\d+/)

  return (match && match[0]) || ''
}
