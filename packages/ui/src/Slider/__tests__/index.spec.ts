import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Slider } from '@/Slider'

describe('Slider', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Slider, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Slider, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  test.concurrent('min max', async () => {
    const wrapper = mount(Slider, {
      props: {
        min: 40,
        max: 140
      }
    })
    expect(wrapper.vm.inputValue).toBe(40)

    await wrapper.setProps({
      modelValue: 140
    })
    expect(wrapper.vm.inputValue).toBe(140)

    await wrapper.setProps({
      modelValue: 200
    })
    expect(wrapper.vm.inputValue).toBe(140)
  })

  test.concurrent('showValue=true', async () => {
    const wrapper = mount(Slider, {
      props: {
        showValue: true
      }
    })
    expect(wrapper.find('.ta-slider_thumb').text()).toBe('0')

    await wrapper.setProps({
      modelValue: 50
    })
    expect(wrapper.find('.ta-slider_thumb').text()).toBe('50')
  })
})
