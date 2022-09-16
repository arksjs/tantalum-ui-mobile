import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Badge } from '@/Badge'
import CloseOutlined from '@/Icon/icons/CloseOutlined'

describe('Badge', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Badge, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('content=1', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        content: 1
      }
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('1')
  })

  test('content="HOT"', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        content: 'HOT'
      }
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('HOT')
  })

  test('dot', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        content: 1,
        dot: true
      }
    })
    expect(wrapper.find('.ak-badge_badge').classes()).toContain('dot')
  })

  test('showZero', () => {
    const wrapper = shallowMount(Badge, {
      props: {
        content: 0,
        showZero: true
      }
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('0')
  })

  test.concurrent('maxCount', async () => {
    const wrapper = mount(Badge, {
      props: {
        content: 1
      }
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('1')

    await wrapper.setProps({
      content: 99
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('99')

    await wrapper.setProps({
      content: 100
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('99+')

    await wrapper.setProps({
      maxCount: 1000
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('100')

    await wrapper.setProps({
      content: 2000
    })
    expect(wrapper.find('.ak-badge_badge').text()).toBe('1000+')
  })

  test.concurrent('color', async () => {
    const wrapper = mount(Badge, {
      props: {
        color: '#6667AB'
      }
    })

    const $badge = wrapper.find('.ak-badge_badge')
    expect($badge.attributes('style')).toContain('--ak-color: #6667AB;')
    expect($badge.attributes('style')).toContain('--ak-front-color: #ffffff;')

    await wrapper.setProps({
      color: '#E2C0BF'
    })
    expect($badge.attributes('style')).toContain('--ak-color: #E2C0BF;')
    expect($badge.attributes('style')).toContain('--ak-front-color: #493234;')
  })

  test('slot bagde', () => {
    const wrapper = mount(Badge, {
      props: {
        content: 1
      },
      slots: {
        badge: CloseOutlined
      }
    })
    expect(wrapper.findComponent(CloseOutlined).exists()).toBeTruthy()
  })
})
