import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Rate } from '@/Rate'

describe('Rate', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Rate, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Rate, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  test('size=40', () => {
    const wrapper = shallowMount(Rate, {
      props: {
        size: 40
      }
    })

    expect(wrapper.attributes('style')).toContain('--ak-size: 40px;')
  })

  test('count=8', () => {
    const wrapper = mount(Rate, {
      props: {
        count: 8
      }
    })

    expect(wrapper.findAll('.ak-rate_item').length).toBe(8)
  })
})
