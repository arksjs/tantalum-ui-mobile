import { isNumeric, isEmpty, kebabCase2CamelCase, camelCase2KebabCase, isObject } from '../util'

describe('isObject', () => {
  test('{}, { a:1 } is object', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })
  test('null, undefined is not object', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
  test('new Error() is object', () => {
    expect(isObject(new Error())).toBe(true)
  })
})

describe('kebabCase2CamelCase', () => {
  test('result check', () => {
    expect(kebabCase2CamelCase('hello')).toBe('hello')
    expect(kebabCase2CamelCase('hello-world')).toBe('helloWorld')
    expect(kebabCase2CamelCase('hello-our-world')).toBe('helloOurWorld')
  })
})

describe('camelCase2KebabCase', () => {
  test('result check', () => {
    expect(camelCase2KebabCase('hello')).toBe('hello')
    expect(camelCase2KebabCase('helloWorld')).toBe('hello-world')
    expect(camelCase2KebabCase('helloOurWorld')).toBe('hello-our-world')
    expect(camelCase2KebabCase('HelloOurWorld')).toBe('hello-our-world')
  })
})

describe('isEmpty', () => {
  test('"" is empty', () => {
    expect(isEmpty('')).toBe(true)
  })
  test('0 is empty', () => {
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(0.0)).toBe(true)
  })
  test('"0" is empty', () => {
    expect(isEmpty('0')).toBe(true)
  })
  test('null is empty', () => {
    expect(isEmpty(null)).toBe(true)
  })
  test('false is empty', () => {
    expect(isEmpty(false)).toBe(true)
  })
  test('[] is empty', () => {
    expect(isEmpty([])).toBe(true)
  })
  test('undefined is empty', () => {
    expect(isEmpty(undefined)).toBe(true)
  })
  test('NaN is empty', () => {
    expect(isEmpty(NaN)).toBe(true)
  })
  test('{} is empty', () => {
    expect(isEmpty({})).toBe(true)
  })
})

describe('isNumeric', () => {
  test('number test', () => {
    expect(isNumeric(1)).toBe(true)
    expect(isNumeric(1.1)).toBe(true)
    expect(isNumeric(100000000000)).toBe(true)
  })
  test('string number test', () => {
    expect(isNumeric('1')).toBe(true)
    expect(isNumeric('1.1')).toBe(true)
    expect(isNumeric('.1')).toBe(true)
    expect(isNumeric('a')).toBe(false)
    expect(isNumeric('1a')).toBe(true)
  })
  test('NaN, Infinity not allowed', () => {
    expect(isNumeric(NaN)).toBe(false)
    expect(isNumeric(Infinity)).toBe(false)
    expect(isNumeric(-Infinity)).toBe(false)
  })
})
