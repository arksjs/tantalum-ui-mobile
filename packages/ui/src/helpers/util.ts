import type { AnyObject, EmptyObject } from './types'

/**
 * 将字段名转为驼峰式格式
 * @param name 字段名
 * @returns eg: my-func -> myFunc
 */
export function kebabCase2CamelCase(name: string) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return name.substring(0, 1).toLowerCase() + name.substring(1)
}

/**
 * 将字段名转为横杆连接格式
 * @param name 字段名
 * @returns eg: myFunc -> my-func
 */
export function camelCase2KebabCase(name: string) {
  const arr = []

  for (let i = 0; i < name.length; i++) {
    let letter = name[i]

    if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90) {
      letter = letter.toLowerCase()
      if (i !== 0) {
        arr.push('-')
      }
    }

    arr.push(letter)
  }

  return arr.join('')
}

/**
 * 是否字符串
 * @param object 值
 * @returns boolean
 */
export function isString(object: unknown): object is string {
  return typeof object === 'string'
}

/**
 * 是否布尔
 * @param object 值
 * @returns boolean
 */
export function isBoolean(object: unknown): object is boolean {
  return typeof object === 'boolean'
}

/**
 * 是否对象，包含常见的{}/[]，不含null
 * @param object 值
 * @returns boolean
 */
export function isObject(object: unknown) {
  return typeof object === 'object' && object !== null
}

/**
 * 是否数值，这里会对排除无穷大/无穷小的情况
 * @param object 值
 * @returns boolean
 */
export function isNumber(object: unknown): object is number {
  return typeof object === 'number' && isFinite(object)
}

/**
 * 是否数值/可转为数值，如'1.1'，这里会对排除无穷大/无穷小的情况
 * @param object 值
 * @returns boolean
 */
export function isNumeric(object: unknown): object is number | string {
  return (
    isNumber(object) ||
    (typeof object === 'string' && isNumber(parseFloat(object)))
  )
}

/**
 * 是否整数
 * @param object 值
 * @returns boolean
 */
export function isInteger(object: unknown): object is number {
  return isNumber(object) && (object as number) % 1 === 0
}

/**
 * 是否Symbol
 * @param object 值
 * @returns boolean
 */
export function isSymbol(object: unknown): object is symbol {
  return (
    typeof object === 'symbol' ||
    (isObject(object) &&
      Object.prototype.toString.call(object) === '[object Symbol]')
  )
}

/**
 * 是否空对象{}
 * @param object 值
 * @returns boolean
 */
export function isEmptyObject(object: unknown): object is EmptyObject {
  return typeof object === 'object' && JSON.stringify(object) === '{}'
}

/**
 * 是否number或string
 * @param object 值
 * @returns boolean
 */
export function isStringNumberMix(object: unknown): object is string | number {
  return typeof object === 'string' || typeof object === 'number'
}

const createArrayValidator = (itemValidator: (item: unknown) => boolean) => {
  const validator = (object: unknown) => {
    let is = false

    if (Array.isArray(object)) {
      is = true

      for (let i = 0; i < object.length; i++) {
        if (!itemValidator(object[i])) {
          is = false
          break
        }
      }
    }

    return is
  }

  return validator
}

/**
 * 是否Number[]
 * @param object 值
 * @returns boolean
 */
export const isNumberArray = createArrayValidator(
  object => typeof object === 'number'
) as (object: unknown) => object is number[]

/**
 * 是否String[]
 * @param object 值
 * @returns boolean
 */
export const isStringArray = createArrayValidator(
  object => typeof object === 'string'
) as (object: unknown) => object is string[]

/**
 * string/string[]统一转为string[]
 * @param object 值
 * @returns string[]
 */
export const stringMix2StringArray = (object: unknown) => {
  return isStringArray(object)
    ? (object as string[])
    : typeof object === 'string'
    ? [object]
    : []
}

/**
 * 是否只存在数值或者字符串的数组
 * @param object 值
 * @returns boolean
 */
export const isStringNumberMixArray = createArrayValidator(object =>
  isStringNumberMix(object)
) as (object: unknown) => object is (number | string)[]

/**
 * 是否Date[]
 * @param object 值
 * @returns boolean
 */
export const isDateArray = createArrayValidator(
  object => object instanceof Date
) as (object: unknown) => object is Date[]

/**
 * 是否相同的数组
 * @param a 数组a
 * @param b 数组b
 * @returns boolean
 */
export function isSameArray(a: unknown[], b: unknown[]): boolean {
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] instanceof Date && b[i] instanceof Date) {
        // 增加处理时间
        if (!isSameDate(a[i] as Date, b[i] as Date)) {
          return false
        }
      } else {
        if (a[i] != b[i]) {
          return false
        }
      }
    }
  } else {
    return false
  }

  return true
}

/**
 * 是否相同时间
 * @param a Date实例a
 * @param b Date实例b
 * @returns boolean
 */
export function isSameDate(a: Date, b: Date) {
  return a.getTime() === b.getTime()
}

/**
 * 判断一个字段是否为空
 * @param object
 * @returns boolean
 *
 * @summary 以下的东西被认为是空的：
 * - "" (空字符串)
 * - 0 (作为整数的0)
 * - 0.0 (作为浮点数的0)
 * - "0" (作为字符串的0)
 * - null
 * - false
 * - []
 * - undefined
 * - NaN
 * - {}
 */
export const isEmpty = (object: unknown) => {
  return (
    object == null ||
    object === '' ||
    object === '0' ||
    object === false ||
    (typeof object === 'number' && (object == 0 || isNaN(object))) ||
    (Array.isArray(object) && object.length === 0) ||
    isEmptyObject(object)
  )
}

/**
 * 伪数组转为数组
 * @param object 伪数组
 * @returns boolean
 */
export function arrayLike2Array(object: ArrayLike<unknown>) {
  return Array.prototype.slice.call(object)
}

/**
 * 不执行任何操作的函数
 */
export const noop = function () {
  // empty
}

/**
 * 返回 ture 的函数
 * @returns true
 */
export function returnTrue() {
  return true
}

/**
 * 返回 false 的函数
 * @returns false
 */
export function returnFalse() {
  return false
}

function hasOwnProperty(object: AnyObject, key: string) {
  return Object.prototype.hasOwnProperty.call(object, key)
}

/**
 * 对象遍历
 * @param object 对象
 * @param callback 遍历回调
 */
export function objectForEach(
  object: unknown,
  callback: (value: unknown, key: string) => void
) {
  if (isObject(object)) {
    const obj = object as AnyObject

    for (const k in obj) {
      if (hasOwnProperty(obj, k)) {
        callback(obj[k], k)
      }
    }
  }
}

/**
 * 深度拷贝对象
 * @param object 对象
 * @returns object副本
 */
export function cloneData<T = any>(object: T): T {
  return JSON.parse(JSON.stringify(object))
}

/**
 * 获取随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
export function getRandomNumber(min: number, max: number) {
  if (min === max) {
    return min
  }
  return Math.round((Math.random() * 1000000) % (max - min)) + min
}

/**
 * 获取GUID
 * @returns guid
 */
export function createGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 获取随机字符
 * @param length 返回字符串长度
 * @returns 指定长度的随机字符
 */
export function getRandomString(length = 32) {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 * 首字母大写
 * @param value 值
 * @returns 处理过的string
 */
export function capitalize(value: string) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const getNumber = (num?: string | number, defaultNum = 0) => {
  return num == null
    ? defaultNum
    : typeof num === 'string'
    ? parseFloat(num)
    : num
}

/**
 * 获取限定范围的数值
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限定数值
 */
export function rangeNumber(number: number, min: number, max: number) {
  return Math.min(max, Math.max(min, number))
}

/**
 * 获取限定范围内的整数
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限定整数
 */
export function rangeInteger(
  number: number | string,
  min: number,
  max: number
) {
  const num = getNumber(number, min)

  return rangeNumber(Math.round(num), Math.ceil(min), Math.floor(max))
}

/**
 * 是否在指定范围内
 * @param number 数值
 * @param min 最小值
 * @param max 最大值
 * @returns boolean
 */
export const isInNumberRange = (number: unknown, min: number, max: number) => {
  return isNumber(number) && number >= min && number <= max
}

/**
 * 是否Promise
 * @param object 值
 * @returns boolean
 */
export const isPromiseLike = (object: unknown) => {
  return (
    (isObject(object) || typeof object === 'function') &&
    typeof (object as Promise<never>).then === 'function'
  )
}

/**
 * 是否为URL
 * @param object 值
 * @returns boolean
 */
export const isURL = (object: unknown) => {
  return (
    typeof object === 'string' &&
    /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?(@?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(
      object as string
    )
  )
}

export const getSameValueArray: <T>(value: T, len: number) => T[] = (
  value,
  len
) => {
  const newArr = []

  for (let i = 0; i < len; i++) {
    newArr.push(value)
  }

  return newArr
}
