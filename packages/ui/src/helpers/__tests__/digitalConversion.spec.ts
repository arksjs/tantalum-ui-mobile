import { simpleNumber, thousands, formatFileSize } from '../digital-conversion'

describe('formatFileSize', () => {
  test('result test', () => {
    expect(formatFileSize(1)).toBe('1bytes')
    expect(formatFileSize(1023)).toBe('1023bytes')
    expect(formatFileSize(1024)).toBe('1KB')
    expect(formatFileSize(1000 * 24)).toBe('23.4KB')
    expect(formatFileSize(1024 * 1024)).toBe('1MB')
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1GB')
    expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe('1024GB')
  })
})

describe('simpleNumber', () => {
  test('result test', () => {
    expect(simpleNumber(1)).toBe('1')
    expect(simpleNumber(11)).toBe('11')
    expect(simpleNumber(111)).toBe('111')
    expect(simpleNumber(1111)).toBe('1111')
    expect(simpleNumber(11111)).toBe('1.11w')
    expect(simpleNumber(111111)).toBe('11.1w')
    expect(simpleNumber(1111111)).toBe('111w')
    expect(simpleNumber(1999999)).toBe('199w')
    expect(simpleNumber(99900000000)).toBe('999y')
    expect(simpleNumber(100000000000)).toBe('999y+')
  })
})

describe('thousands', () => {
  test('type number test', () => {
    expect(thousands(1)).toBe('1')
    expect(thousands(11)).toBe('11')
    expect(thousands(111)).toBe('111')
    expect(thousands(1111)).toBe('1,111')
    expect(thousands(1111111)).toBe('1,111,111')
  })

  test('type string test', () => {
    expect(thousands('1')).toBe('1')
    expect(thousands('11')).toBe('11')
    expect(thousands('111')).toBe('111')
    expect(thousands('1111')).toBe('1,111')
    expect(thousands('1111111')).toBe('1,111,111')
  })

  test('"1,111,111" -> "1,111,111"', () => {
    expect(thousands('1,111,111')).toBe('1,111,111')
  })
})
