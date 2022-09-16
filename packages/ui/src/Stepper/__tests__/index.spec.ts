import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Stepper } from '@/Stepper'

describe('Stepper', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Stepper, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('disabled=true', () => {
    const wrapper = mount(Stepper, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.classes()).toContain('disabled')
    expect(wrapper.find('.ak-stepper_input').attributes('disabled')).toBe('')

    const $buttons = wrapper.findAllComponents('.ak-button')

    expect($buttons[0].attributes('disabled')).toBe('')
    expect($buttons[1].attributes('disabled')).toBe('')
  })

  test.concurrent('disabledPlus & disabledMinus', async () => {
    const wrapper = mount(Stepper, {
      props: {
        disabledPlus: true,
        max: 5
      }
    })

    const $buttons = wrapper.findAllComponents('.ak-button')

    expect($buttons[0].attributes('disabled')).toBe('') // 当前处于最小值
    expect($buttons[1].attributes('disabled')).toBe('')

    await wrapper.setProps({
      modelValue: '2'
    })

    expect($buttons[0].attributes('disabled')).toBeUndefined()
    expect($buttons[1].attributes('disabled')).toBe('')

    await wrapper.setProps({
      disabledMinus: true,
      disabledPlus: false
    })

    expect($buttons[0].attributes('disabled')).toBe('')
    expect($buttons[1].attributes('disabled')).toBeUndefined()

    await wrapper.setProps({
      modelValue: '10'
    })

    expect($buttons[0].attributes('disabled')).toBe('')
    expect($buttons[1].attributes('disabled')).toBe('') // 当前处于最大值
  })

  test.concurrent('min max', async () => {
    const wrapper = mount(Stepper, {
      props: {
        min: 1,
        max: 5
      }
    })

    expect(wrapper.vm.formValue).toBe('1')

    // 按钮操作
    const $buttons = wrapper.findAllComponents('.ak-button')

    await $buttons[0].trigger('click')
    expect(wrapper.vm.formValue).toBe('1')

    await $buttons[1].trigger('click')
    expect(wrapper.vm.formValue).toBe('2')

    await $buttons[1].trigger('click')
    await $buttons[1].trigger('click')
    await $buttons[1].trigger('click')
    expect(wrapper.vm.formValue).toBe('5')

    await $buttons[1].trigger('click')
    expect(wrapper.vm.formValue).toBe('5')

    // 输入框操作
    await wrapper.find('input').setValue('3')
    expect(wrapper.vm.formValue).toBe('3')

    await wrapper.find('input').setValue('10')
    expect(wrapper.vm.formValue).toBe('5')
  })

  test.concurrent('step=0.1', async () => {
    const wrapper = mount(Stepper, {
      props: {
        min: 1,
        max: 5,
        step: 0.1
      }
    })

    expect(wrapper.vm.formValue).toBe('1')

    // 按钮操作
    const $buttons = wrapper.findAllComponents('.ak-button')

    await $buttons[1].trigger('click')
    expect(wrapper.vm.formValue).toBe('1.1')
  })

  test.concurrent('decimalLength=1', async () => {
    const wrapper = mount(Stepper, {
      props: {
        decimalLength: 1
      }
    })

    expect(wrapper.vm.formValue).toBe('1')

    await wrapper.setProps({
      modelValue: '1.1'
    })
    expect(wrapper.vm.formValue).toBe('1.1')

    await wrapper.setProps({
      modelValue: '1.11'
    })
    expect(wrapper.vm.formValue).toBe('1.1')
  })
})
