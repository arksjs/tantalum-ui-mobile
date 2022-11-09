import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Input } from '@/Input'
import { timeout } from '@arksjs/test-utils/utils'

describe('Input', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Input, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Input, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('.ta-input_input').attributes('disabled')).toBe('')
  })

  test('showClear=true ', async () => {
    const wrapper = mount(Input, {
      props: {
        showClear: true,
        modelValue: 'text'
      }
    })

    await wrapper.find('.ta-input_input').trigger('focus')
    await timeout(250)
    expect(wrapper.find('.ta-input_clear').exists()).toBeTruthy()
  })
})
