import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Picker, PickerPopup, PickerView } from '@/Picker'

describe('Picker', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Picker, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('PickerPopup', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(PickerPopup, {
      props: {
        options: []
      },
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('PickerView', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(PickerView, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
