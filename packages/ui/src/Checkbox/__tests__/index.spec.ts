import { describe, test, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { Checkbox, CheckboxGroup } from '@/Checkbox'

describe('Checkbox', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Checkbox, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })
})

describe('CheckboxGroup', () => {
  test('snapshot', () => {
    const wrapper = mount(CheckboxGroup, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: [Checkbox]
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.findComponent(Checkbox).classes()).toContain('disabled')
  })
})
