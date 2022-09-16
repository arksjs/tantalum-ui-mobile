import { describe, test, expect } from 'vitest'
import { mount, shallowMount, VueWrapper } from '@vue/test-utils'
import { Image } from '@/Image'
import { Avatar, AvatarGroup } from '@/Avatar'
import UserOutlined from '@/Icon/icons/UserOutlined'

const imgUrl = 'https://cdn.fox2.cn/vfox/avatar/5.png'

describe('Avatar', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Avatar, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('has avatar icon', () => {
    const wrapper = mount(Avatar, {})
    expect(wrapper.findComponent(UserOutlined).exists()).toBeTruthy()
  })

  test('src', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: imgUrl
      }
    })
    expect(wrapper.findComponent(Image).exists()).toBeTruthy()
  })

  test.concurrent('size', async () => {
    const wrapper = mount(Avatar, {})
    expect(wrapper.classes()).toContain('size--middle')

    await wrapper.setProps({
      size: 'large'
    })
    expect(wrapper.classes()).toContain('size--large')

    await wrapper.setProps({
      size: 'small'
    })
    expect(wrapper.classes()).toContain('size--small')

    await wrapper.setProps({
      size: 24
    })
    expect(wrapper.classes()).toContain('size--24')
  })

  test.concurrent('shape', async () => {
    const wrapper = mount(Avatar, {})
    expect(wrapper.classes()).toContain('shape--circle')

    await wrapper.setProps({
      shape: 'square'
    })
    expect(wrapper.classes()).toContain('shape--square')
  })

  test.concurrent('color', async () => {
    const wrapper = mount(Avatar, {
      props: {
        color: '#6667AB'
      }
    })
    expect(wrapper.attributes('style')).toContain('--ak-color: #6667AB;')
    expect(wrapper.attributes('style')).toContain('--ak-front-color: #ffffff;')

    await wrapper.setProps({
      color: '#E2C0BF'
    })
    expect(wrapper.attributes('style')).toContain('--ak-color: #E2C0BF;')
    expect(wrapper.attributes('style')).toContain('--ak-front-color: #493234;')
  })

  test('slot', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: 'text'
      }
    })
    expect(wrapper.element.textContent).toBe('text0')
  })
})

describe('AvatarGroup', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(AvatarGroup, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('size', async () => {
    const wrapper = mount(AvatarGroup, {
      slots: {
        default: [Avatar, Avatar]
      }
    })
    expect(wrapper.findComponent(Avatar).classes()).toContain('size--middle')

    await wrapper.setProps({
      size: 'large'
    })
    expect(wrapper.findComponent(Avatar).classes()).toContain('size--large')

    await wrapper.setProps({
      size: 'small'
    })
    expect(wrapper.findComponent(Avatar).classes()).toContain('size--small')

    await wrapper.setProps({
      size: 24
    })
    expect(wrapper.findComponent(Avatar).classes()).toContain('size--24')
  })

  test.concurrent('totalCount', async () => {
    const wrapper = mount(AvatarGroup, {
      props: {
        totalCount: 1
      },
      slots: {
        default: [Avatar, Avatar]
      }
    })
    const $last = wrapper.findAllComponents(Avatar).at(-1) as VueWrapper<any>
    const $text = $last.find('.ak-avatar-group_count-number')
    expect($text.text()).toBe('1')
    expect($text.classes()).toContain('size--1')

    await wrapper.setProps({
      totalCount: 123456
    })
    expect($text.text()).toBe('12.3w')
    expect($text.classes()).toContain('size--5')
  })

  test.concurrent('countColor', async () => {
    const wrapper = mount(AvatarGroup, {
      props: {
        totalCount: 1,
        countColor: '#6667AB'
      },
      slots: {
        default: [Avatar, Avatar]
      }
    })

    const $last = wrapper.findAllComponents(Avatar).at(-1) as VueWrapper<any>
    expect($last.attributes('style')).toContain('--ak-color: #6667AB;')
    expect($last.attributes('style')).toContain('--ak-front-color: #ffffff;')

    await wrapper.setProps({
      countColor: '#E2C0BF'
    })
    expect($last.attributes('style')).toContain('--ak-color: #E2C0BF;')
    expect($last.attributes('style')).toContain('--ak-front-color: #493234;')
  })
})
