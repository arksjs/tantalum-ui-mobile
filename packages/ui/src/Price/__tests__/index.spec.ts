import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Price } from '@/Price'

const price = 1111.11

describe('Price', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('symbol="￥"', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price,
        symbol: '￥'
      }
    })

    expect(wrapper.find('.ak-price_symbol').text()).toBe('￥')
  })

  test('thousands', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price,
        thousands: true
      }
    })

    expect(wrapper.find('.ak-price_integer').text()).toBe('1,111')
  })

  test('decimalDigits=3', () => {
    const wrapper = shallowMount(Price, {
      props: {
        price,
        decimalDigits: 3
      }
    })

    expect(wrapper.find('.ak-price_decimal').text()).toBe('.110')
  })
})
