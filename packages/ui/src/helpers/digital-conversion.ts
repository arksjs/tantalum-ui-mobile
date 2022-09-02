import { isNumber } from './util'

/**
 * 格式化文件大小值，最多保留1位小数，如：10MB，10.8KB
 * @param number 值
 * @returns string
 */
export const formatFileSize = (number: number) => {
  const map: [number, string][] = [
    [1073741824, 'GB'],
    [1048576, 'MB'],
    [1024, 'KB'],
    [0, 'bytes']
  ]

  let size = 0
  let unit = 'bytes'

  for (let i = 0; i < map.length; i++) {
    if (number >= map[i][0]) {
      size = i < map.length - 1 ? number / map[i][0] : number
      unit = map[i][1]
      break
    }
  }

  size = Math.round(size * 10) / 10

  return size + unit
}

/**
 * 简化数值
 * @param number 数值
 * @returns eg: 1.1w
 */
export function simpleNumber(number: number) {
  if (!isNumber(number)) {
    return '0'
  }

  function toFixed(number: number) {
    return number.toString().substr(0, 4).replace(/\.$/, '')
  }

  number = Math.floor(number)

  if (number > 100000000) {
    number = number / 100000000

    if (number > 999) {
      return '999y+'
    }

    return toFixed(number) + 'y'
  } else if (number > 10000) {
    return toFixed(number / 10000) + 'w'
  }

  return number.toString()
}

/**
 * 千分位
 * @param num 数字
 * @returns eg: 1,111
 */
export function thousands(number: number | string) {
  const str = number.toString()

  return str.replace(
    str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g,
    '$1,'
  )
}
