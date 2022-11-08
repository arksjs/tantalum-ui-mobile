import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { NoticeBar } from '@/NoticeBar'
import CircleOutlined from '@/Icon/icons/CircleOutlined'
import CloseOutlined from '@/Icon/icons/CloseOutlined'
import RightOutlined from '@/Icon/icons/RightOutlined'
import { markRaw } from 'vue'

describe('NoticeBar', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(NoticeBar, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('marquee', () => {
    const wrapper = mount(NoticeBar, {
      props: { marquee: true }
    })
    expect(wrapper.find('.ta-notice-bar_content-inner').classes()).toContain(
      'marquee'
    )
  })

  test('leftIcon', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        leftIcon: markRaw(CircleOutlined)
      }
    })
    expect(wrapper.findComponent(CircleOutlined).exists()).toBeTruthy()
  })

  test('type', async () => {
    const wrapper = mount(NoticeBar, {})
    expect(wrapper.classes()).toContain('type--default')

    await wrapper.setProps({
      type: 'success'
    })
    expect(wrapper.classes()).toContain('type--success')

    await wrapper.setProps({
      type: 'primary'
    })
    expect(wrapper.classes()).toContain('type--primary')

    await wrapper.setProps({
      type: 'danger'
    })
    expect(wrapper.classes()).toContain('type--danger')
  })

  test('mode="closable"', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        mode: 'closable'
      }
    })
    expect(wrapper.findComponent(CloseOutlined).exists()).toBeTruthy()
  })

  test('mode="clickable"', () => {
    const wrapper = mount(NoticeBar, {
      props: {
        mode: 'clickable'
      }
    })
    expect(wrapper.findComponent(RightOutlined).exists()).toBeTruthy()
  })

  test('color', async () => {
    const wrapper = mount(NoticeBar, {
      props: {
        color: '#6667AB'
      }
    })

    expect(wrapper.attributes('style')).toContain('--ta-color: #6667AB;')
    expect(wrapper.attributes('style')).toContain('--ta-front-color: #ffffff;')

    await wrapper.setProps({
      color: '#E2C0BF'
    })

    expect(wrapper.attributes('style')).toContain('--ta-color: #E2C0BF;')
    expect(wrapper.attributes('style')).toContain('--ta-front-color: #493234;')
  })
})
