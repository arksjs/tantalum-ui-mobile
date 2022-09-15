import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Range } from '@/Range'

describe('Range', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Range, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Range, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  test.concurrent('min max', async () => {
    const wrapper = mount(Range, {
      props: {
        min: 40,
        max: 140
      }
    })
    expect(wrapper.vm.inputValue).toBe('40,140')

    await wrapper.setProps({
      modelValue: [20, 200]
    })
    expect(wrapper.vm.inputValue).toBe('40,140')

    await wrapper.setProps({
      modelValue: [60, 120]
    })
    expect(wrapper.vm.inputValue).toBe('60,120')
  })

  test.concurrent('showValue=true', async () => {
    const wrapper = mount(Range, {
      props: {
        showValue: true
      }
    })

    const $thumbs = wrapper.findAll('.ak-slider_thumb')
    expect($thumbs[0].text()).toBe('0')
    expect($thumbs[1].text()).toBe('100')

    await wrapper.setProps({
      modelValue: [10, 90]
    })
    expect($thumbs[0].text()).toBe('10')
    expect($thumbs[1].text()).toBe('90')
  })
})
