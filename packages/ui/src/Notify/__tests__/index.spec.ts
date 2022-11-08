import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Notify } from '@/Notify'

const title = 'title'

describe('Notify', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Notify, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('type', async () => {
    const wrapper = mount(Notify, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.findComponent('.ta-notice-bar').classes()).toContain(
      'type--default'
    )

    await wrapper.setProps({
      type: 'primary'
    })
    expect(wrapper.findComponent('.ta-notice-bar').classes()).toContain(
      'type--primary'
    )

    await wrapper.setProps({
      type: 'success'
    })
    expect(wrapper.findComponent('.ta-notice-bar').classes()).toContain(
      'type--success'
    )

    await wrapper.setProps({
      type: 'warning'
    })
    expect(wrapper.findComponent('.ta-notice-bar').classes()).toContain(
      'type--warning'
    )

    await wrapper.setProps({
      type: 'danger'
    })
    expect(wrapper.findComponent('.ta-notice-bar').classes()).toContain(
      'type--danger'
    )
  })

  test('title', () => {
    const wrapper = mount(Notify, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        title
      }
    })

    expect(wrapper.find('.ta-notice-bar_content').text()).toBe(title)
  })
})
