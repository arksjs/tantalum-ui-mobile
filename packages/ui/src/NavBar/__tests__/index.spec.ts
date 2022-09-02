import { describe, test, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { NavBar } from '@/NavBar'
import { Icon } from '@/Icon'
import { Button } from '@/Button'
import LeftOutlined from '@/Icon/icons/LeftOutlined'
import HomeOutlined from '@/Icon/icons/HomeOutlined'

describe('NavBar', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(NavBar, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('showBack & showHome', () => {
    const wrapper = mount(NavBar, {
      props: {
        showBack: true,
        showHome: true
      }
    })
    expect(wrapper.findComponent(LeftOutlined).exists()).toBeTruthy()
    expect(wrapper.findComponent(HomeOutlined).exists()).toBeTruthy()
  })

  test('leftButtons', () => {
    const wrapper = mount(NavBar, {
      props: {
        leftButtons: [{ icon: 'MenuOutlined', text: 'Menu' }]
      }
    })
    expect(wrapper.findComponent(Icon).exists()).toBeTruthy()
    expect(wrapper.findComponent(Button).exists()).toBeTruthy()
  })

  test('rightButtons', () => {
    const wrapper = mount(NavBar, {
      props: {
        rightButtons: [{ icon: 'MenuOutlined', text: 'Menu' }]
      }
    })
    expect(wrapper.findComponent(Icon).exists()).toBeTruthy()
    expect(wrapper.findComponent(Button).exists()).toBeTruthy()
  })

  test('slots', () => {
    const wrapper = mount(NavBar, {
      slots: {
        left: 'leftSlot',
        right: 'rightSlot'
      }
    })
    expect(wrapper.find('.ak-nav-bar_left').text()).toBe('leftSlot')
    expect(wrapper.find('.ak-nav-bar_right').text()).toBe('rightSlot')
  })
})
