import { formatInputDigit, formatInputNumber } from '../input'

describe('formatInputDigit', () => {
  test('result test', () => {
    expect(formatInputDigit(1)).toBe('1')
    expect(formatInputDigit('1')).toBe('1')
    expect(formatInputDigit(1.1)).toBe('1')
    expect(formatInputDigit(1.9)).toBe('1')
  })
})

describe('formatInputNumber', () => {
  test('param decimalLength = 2', () => {
    expect(formatInputNumber(1, 2)).toBe('1')
    expect(formatInputNumber('1.', 2)).toBe('1.')
    expect(formatInputNumber(1.1, 2)).toBe('1.1')
    expect(formatInputNumber(1.11, 2)).toBe('1.11')
    expect(formatInputNumber(1.111, 2)).toBe('1.11')
    expect(formatInputNumber(1.119, 2)).toBe('1.11')
  })
})
