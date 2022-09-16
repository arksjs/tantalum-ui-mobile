import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Dialog } from '@/Dialog'
import { Button } from '@/Button'

describe('Dialog', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Dialog, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('content', () => {
    const content = 'content'
    const wrapper = mount(Dialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        content
      }
    })
    expect(wrapper.find('.ak-dialog_content').text()).toBe(content)
  })

  test.concurrent('showCancel=false', async () => {
    const wrapper = mount(Dialog, {
      global: {
        stubs: { teleport: true }
      }
    })
    expect(wrapper.findAllComponents(Button).length).toBe(2)

    await wrapper.setProps({
      showCancel: false
    })
    expect(wrapper.findAllComponents(Button).length).toBe(1)
  })

  test.concurrent('cancelText & confirmText', async () => {
    const wrapper = mount(Dialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        cancelText: 'cancelText',
        confirmText: 'confirmText'
      }
    })
    const $buttons = wrapper.findAllComponents(Button)

    expect($buttons[0].text()).toBe('cancelText')
    expect($buttons[1].text()).toBe('confirmText')
  })
})
