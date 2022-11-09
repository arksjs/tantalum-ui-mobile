import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { PopDialog } from '@/PopDialog'
import { Button } from '@/Button'

const selector = 'body'
const content = 'content'

describe('PopDialog', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(PopDialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector,
        content
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('content', () => {
    const wrapper = mount(PopDialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        content,
        selector
      }
    })
    expect(wrapper.find('.ta-popover_text').text()).toBe(content)
  })

  test.concurrent('showCancel=false', async () => {
    const wrapper = mount(PopDialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        content,
        selector
      }
    })
    expect(wrapper.findAllComponents(Button).length).toBe(2)

    await wrapper.setProps({
      showCancel: false
    })
    expect(wrapper.findAllComponents(Button).length).toBe(1)
  })

  test.concurrent('showMask', async () => {
    const wrapper = mount(PopDialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        content,
        selector
      }
    })
    expect(wrapper.find('.ta-popover').classes('no--mask')).toBeFalsy()

    await wrapper.setProps({
      showMask: false
    })
    expect(wrapper.find('.ta-popover').classes('no--mask')).toBeTruthy()
  })

  test.concurrent('cancelText & confirmText', async () => {
    const wrapper = mount(PopDialog, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        content,
        selector,
        cancelText: 'cancelText',
        confirmText: 'confirmText'
      }
    })
    const $buttons = wrapper.findAllComponents(Button)

    expect($buttons[0].text()).toBe('cancelText')
    expect($buttons[1].text()).toBe('confirmText')
  })
})
