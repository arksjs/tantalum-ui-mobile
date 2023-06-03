import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Drawer } from '@/Drawer'
import CloseOutlined from '@/Icon/icons/CloseOutlined'

describe('Drawer', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Drawer, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('title', async () => {
    const title = 'title'
    const wrapper = mount(Drawer, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        title
      }
    })
    expect(wrapper.find('.ta-nav-bar_title').text()).toBe(title)
    expect(wrapper.find('.ta-drawer_header').exists()).toBeTruthy()
  })

  test('showClose', async () => {
    const wrapper = mount(Drawer, {
      global: {
        stubs: { teleport: true }
      }
    })
    expect(wrapper.findComponent(CloseOutlined).exists()).toBeFalsy()
    expect(wrapper.find('.ta-drawer_header').exists()).toBeFalsy()

    await wrapper.setProps({
      showClose: true
    })
    expect(wrapper.findComponent(CloseOutlined).exists()).toBeTruthy()
    expect(wrapper.find('.ta-drawer_header').exists()).toBeTruthy()
  })

  test('placement', async () => {
    const wrapper = mount(Drawer, {
      global: {
        stubs: { teleport: true }
      }
    })
    expect(wrapper.find('.ta-drawer_inner').classes()).toContain('placement--bottom')

    await wrapper.setProps({
      placement: 'top'
    })
    expect(wrapper.find('.ta-drawer_inner').classes()).toContain('placement--top')

    await wrapper.setProps({
      placement: 'left'
    })
    expect(wrapper.find('.ta-drawer_inner').classes()).toContain('placement--left')

    await wrapper.setProps({
      placement: 'right'
    })
    expect(wrapper.find('.ta-drawer_inner').classes()).toContain('placement--right')
  })
})
