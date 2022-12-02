import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Popover } from '@/Popover'

const selector = 'body'

describe('Popover', () => {
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

  test('content', () => {
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
    expect(wrapper.find('.ta-popover_text').text()).toBe(content)
  })

  test.concurrent('showMask', async () => {
    const wrapper = mount(Popover, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      }
    })
    expect(wrapper.find('.ta-popover').classes('dismask')).toBeFalsy()

    await wrapper.setProps({
      showMask: false
    })
    expect(wrapper.find('.ta-popover').classes('dismask')).toBeTruthy()
  })
})
