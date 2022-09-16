import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Fixed } from '@/Fixed'

describe('Fixed', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Fixed, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('set placement', async () => {
    const wrapper = shallowMount(Fixed, {})

    expect(wrapper.find('.ak-fixed_inner').classes()).toContain(
      'placement--bottom'
    )

    await wrapper.setProps({
      placement: 'top'
    })
    expect(wrapper.find('.ak-fixed_inner').classes()).toContain(
      'placement--top'
    )

    await wrapper.setProps({
      placement: 'left'
    })
    expect(wrapper.find('.ak-fixed_inner').classes()).toContain(
      'placement--left'
    )

    await wrapper.setProps({
      placement: 'right'
    })
    expect(wrapper.find('.ak-fixed_inner').classes()).toContain(
      'placement--right'
    )
  })

  test('background', () => {
    const wrapper = shallowMount(Fixed, {
      props: {
        background: '#ffffff'
      }
    })

    expect(wrapper.find('.ak-fixed_inner').attributes('style')).toContain(
      'background: rgb(255, 255, 255)'
    )
  })

  test.concurrent('zIndex', async () => {
    const wrapper = shallowMount(Fixed, {})
    expect(wrapper.find('.ak-fixed_inner').attributes('style')).toContain(
      'z-index: 1'
    )

    await wrapper.setProps({
      zIndex: 10
    })
    expect(wrapper.find('.ak-fixed_inner').attributes('style')).toContain(
      'z-index: 10'
    )
  })
})
