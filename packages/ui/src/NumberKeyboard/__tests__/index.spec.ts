import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { NumberKeyboard } from '@/NumberKeyboard'

describe('NumberKeyboard', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('customKey="."', () => {
    const wrapper = mount(NumberKeyboard, {
      props: {
        customKey: '.'
      },
      global: {
        stubs: { teleport: true }
      }
    })

    const $items = wrapper.findAll('.ta-number-keyboard_item')

    expect($items[9].text()).toBe('.')
  })

  test('type="rightColumn"', () => {
    const wrapper = mount(NumberKeyboard, {
      props: {
        type: 'rightColumn'
      },
      global: {
        stubs: { teleport: true }
      }
    })

    expect(
      wrapper.find('.ta-number-keyboard_right-column').exists()
    ).toBeTruthy()
  })

  test('type="rightColumn" and customKey=["00", "."]', () => {
    const wrapper = mount(NumberKeyboard, {
      props: {
        type: 'rightColumn',
        customKey: ['00', '.']
      },
      global: {
        stubs: { teleport: true }
      }
    })

    const $items = wrapper.findAll('.ta-number-keyboard_item')

    expect($items[9].text()).toBe('00')
    expect($items[11].text()).toBe('.')
  })
})
