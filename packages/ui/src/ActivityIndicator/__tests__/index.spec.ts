import { describe, test, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { ActivityIndicator } from '@/ActivityIndicator'

describe('ActivityIndicator', () => {
  test.concurrent('snapshot', async () => {
    const wrapper = shallowMount(ActivityIndicator, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('size=48', () => {
    const wrapper = mount(ActivityIndicator, {
      props: { size: 48 }
    })

    expect(wrapper.attributes('height')).toBe('48')
    expect(wrapper.attributes('width')).toBe('48')
  })

  const color = '#000000'
  test(`color="${color}"`, () => {
    const wrapper = mount(ActivityIndicator, {
      props: { color }
    })

    expect(wrapper.find('.fx-loading-icon_thumb').attributes('stroke')).toBe(
      color
    )
  })
})
