import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Popover } from '@/Popover'

describe('Popover', () => {
  const selector = 'body'

  test('snapshot', () => {
    const wrapper = shallowMount(Popover, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('content', async () => {
    const content = 'content'
    const wrapper = mount(Popover, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        content,
        selector
      }
    })
    expect(wrapper.find('.fx-popover_text').text()).toBe(content)
  })

  test('showMask', async () => {
    const wrapper = mount(Popover, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      }
    })
    expect(wrapper.find('.fx-popover').classes('no--mask')).toBeFalsy()

    await wrapper.setProps({
      showMask: false
    })
    expect(wrapper.find('.fx-popover').classes('no--mask')).toBeTruthy()
  })
})
