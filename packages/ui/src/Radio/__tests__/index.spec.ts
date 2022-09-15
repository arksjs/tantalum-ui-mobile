import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Radio, RadioGroup } from '@/Radio'

describe('Radio', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Radio, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Radio, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })
})

describe('RadioGroup', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(RadioGroup, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = mount(RadioGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: [Radio]
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.findComponent(Radio).classes()).toContain('disabled')
  })
})
