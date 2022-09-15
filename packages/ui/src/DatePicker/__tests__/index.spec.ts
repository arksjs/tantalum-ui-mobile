import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { DatePicker, DatePickerPopup, DatePickerView } from '@/DatePicker'

describe('DatePicker', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(DatePicker, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('DatePickerPopup', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(DatePickerPopup, {
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

describe('DatePickerView', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(DatePickerView, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
