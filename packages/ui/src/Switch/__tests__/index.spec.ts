import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Switch } from '@/Switch'

describe('Switch', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Switch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = shallowMount(Switch, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('.ak-switch_checkbox').attributes('disabled')).toBe('')
  })

  test('size=40', () => {
    const wrapper = shallowMount(Switch, {
      props: {
        size: 40
      }
    })

    expect(wrapper.attributes('style')).toContain('--ak-size: 40px;')
  })

  test.concurrent('update modelValue', async () => {
    const wrapper = shallowMount(Switch, {})
    expect(wrapper.vm.checked).toBeFalsy()

    await wrapper.setProps({
      modelValue: true
    })
    expect(wrapper.vm.checked).toBeTruthy()
  })
})
