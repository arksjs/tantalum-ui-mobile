import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Toast } from '@/Toast'
import { ActivityIndicator } from '@/ActivityIndicator'
import CheckOutlined from '@/Icon/icons/CheckOutlined'
import CloseOutlined from '@/Icon/icons/CloseOutlined'

const title = 'title'

describe('Toast', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Toast, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('title', () => {
    const wrapper = shallowMount(Toast, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        title
      }
    })

    expect(wrapper.find('.ta-toast_text').text()).toBe(title)
  })

  test.concurrent('type="loading"', () => {
    const wrapper = mount(Toast, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        type: 'loading'
      }
    })

    expect(wrapper.findComponent(ActivityIndicator).exists()).toBeTruthy()
    expect(wrapper.find('.ta-toast_box').classes()).toContain('has--icon')
  })

  test.concurrent('type="success"', () => {
    const wrapper = mount(Toast, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        type: 'success'
      }
    })

    expect(wrapper.findComponent(CheckOutlined).exists()).toBeTruthy()
    expect(wrapper.find('.ta-toast_box').classes()).toContain('has--icon')
  })

  test.concurrent('type="fail"', () => {
    const wrapper = mount(Toast, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        type: 'fail'
      }
    })

    expect(wrapper.findComponent(CloseOutlined).exists()).toBeTruthy()
    expect(wrapper.find('.ta-toast_box').classes()).toContain('has--icon')
  })

  test.concurrent('showMask', async () => {
    const wrapper = mount(Toast, {
      global: {
        stubs: { teleport: true }
      }
    })
    expect(wrapper.find('.ta-toast').classes('dismask')).toBeTruthy()

    await wrapper.setProps({
      showMask: true
    })
    expect(wrapper.find('.ta-toast').classes('dismask')).toBeFalsy()
  })
})
