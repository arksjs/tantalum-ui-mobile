import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Tag } from '@/Tag'
import CloseOutlined from '@/Icon/icons/CloseOutlined'

describe('Tag', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Tag, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('pattern', async () => {
    const wrapper = mount(Tag, {})
    expect(wrapper.classes()).toContain('pattern--light')

    await wrapper.setProps({
      pattern: 'light'
    })
    expect(wrapper.classes()).toContain('pattern--light')

    await wrapper.setProps({
      pattern: 'dark'
    })
    expect(wrapper.classes()).toContain('pattern--dark')

    await wrapper.setProps({
      pattern: 'plain'
    })
    expect(wrapper.classes()).toContain('pattern--plain')
  })

  test('size', async () => {
    const wrapper = mount(Tag, {})
    expect(wrapper.classes()).toContain('size--middle')

    await wrapper.setProps({
      size: 'small'
    })
    expect(wrapper.classes()).toContain('size--small')

    await wrapper.setProps({
      size: 'middle'
    })
    expect(wrapper.classes()).toContain('size--middle')

    await wrapper.setProps({
      size: 'large'
    })
    expect(wrapper.classes()).toContain('size--large')
  })

  test('color', async () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#6667AB'
      }
    })

    expect(wrapper.attributes('style')).toContain('--ta-color: #6667AB;')
    expect(wrapper.attributes('style')).toContain('--ta-black-color: #090812;')

    await wrapper.setProps({
      color: '#E2C0BF'
    })

    expect(wrapper.attributes('style')).toContain('--ta-color: #E2C0BF;')
    expect(wrapper.attributes('style')).toContain('--ta-black-color: #493234;')
  })

  test('closable', () => {
    const wrapper = mount(Tag, {
      props: {
        closable: true
      }
    })
    expect(wrapper.findComponent(CloseOutlined).exists()).toBeTruthy()
  })
})
