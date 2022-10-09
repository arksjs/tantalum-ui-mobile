import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Calendar, CalendarPopup, CalendarView } from '@/Calendar'

const minDate = new Date(1640966400000)
const maxDate = new Date(1672502399999)

describe('Calendar', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Calendar, {
      props: {
        minDate,
        maxDate
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('CalendarPopup', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(CalendarPopup, {
      props: {
        minDate,
        maxDate
      },
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('CalendarView', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(CalendarView, {
      props: {
        minDate,
        maxDate
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
