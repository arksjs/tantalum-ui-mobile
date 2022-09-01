import { describe, expect, test } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Button, ButtonGroup } from '@/Button'
import { markRaw, nextTick } from 'vue'
import CircleOutlined from '@/Icon/icons/CircleOutlined'
import LoadingOutlined from '@/Icon/icons/LoadingOutlined'

describe('Button', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Button, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('prop type', async () => {
    const wrapper = mount(Button, {
      props: {
        type: 'default'
      }
    })

    expect(wrapper.classes()).toContain('type--default')
    await wrapper.setProps({
      type: 'primary'
    })
    expect(wrapper.classes()).toContain('type--primary')
    await wrapper.setProps({
      type: 'success'
    })
    expect(wrapper.classes()).toContain('type--success')
    await wrapper.setProps({
      type: 'warning'
    })
    expect(wrapper.classes()).toContain('type--warning')
    await wrapper.setProps({
      type: 'danger'
    })
    expect(wrapper.classes()).toContain('type--danger')
  })

  test('prop size', async () => {
    const wrapper = mount(Button, {
      props: {
        size: 'middle'
      }
    })

    expect(wrapper.classes()).toContain('size--middle')
    await wrapper.setProps({
      size: 'large'
    })
    expect(wrapper.classes()).toContain('size--large')
    await wrapper.setProps({
      size: 'small'
    })
    expect(wrapper.classes()).toContain('size--small')
  })

  test('prop pattern', async () => {
    const wrapper = mount(Button, {
      props: {
        pattern: 'default'
      }
    })

    expect(wrapper.classes()).toContain('pattern--default')
    await wrapper.setProps({
      pattern: 'solid'
    })
    expect(wrapper.classes()).toContain('pattern--solid')
    await wrapper.setProps({
      pattern: 'dashed'
    })
    expect(wrapper.classes()).toContain('pattern--dashed')
    await wrapper.setProps({
      pattern: 'borderless'
    })
    expect(wrapper.classes()).toContain('pattern--borderless')
    await wrapper.setProps({
      pattern: 'gradient'
    })
    expect(wrapper.classes()).toContain('pattern--gradient')
  })

  test('prop shape', async () => {
    const wrapper = mount(Button, {
      props: {
        shape: 'rectangle'
      }
    })

    expect(wrapper.classes()).toContain('shape--rectangle')
    await wrapper.setProps({
      shape: 'round'
    })
    expect(wrapper.classes()).toContain('shape--round')
    await wrapper.setProps({
      shape: 'circle'
    })
    expect(wrapper.classes()).toContain('shape--circle')
    await wrapper.setProps({
      shape: 'square'
    })
    expect(wrapper.classes()).toContain('shape--square')
  })

  test('prop color', async () => {
    const wrapper = mount(Button, {
      props: {
        color: '#6667AB'
      }
    })

    expect(wrapper.attributes('style')).toContain('--fx-color: #6667AB;')
    expect(wrapper.attributes('style')).toContain('--fx-dark-color: #4A4985;')
    expect(wrapper.attributes('style')).toContain('--fx-light-color: #8B8DB8;')

    await wrapper.setProps({
      color: '#E2C0BF'
    })

    expect(wrapper.attributes('style')).toContain('--fx-color: #E2C0BF;')
    expect(wrapper.attributes('style')).toContain('--fx-dark-color: #BC9595;')
    expect(wrapper.attributes('style')).toContain('--fx-light-color: #EFE1E0;')
    expect(wrapper.attributes('style')).toContain('--fx-front-color: #493234;')
  })

  test('prop icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: markRaw(CircleOutlined)
      }
    })

    expect(wrapper.classes()).toContain('has--icon')
    expect(wrapper.findComponent(CircleOutlined).exists()).toBeTruthy()
  })

  test('prop loading', () => {
    const wrapper = mount(Button, {
      props: {
        icon: markRaw(CircleOutlined),
        loading: true
      }
    })

    expect(wrapper.find('.fx-icon').classes()).toContain('spin')
    expect(wrapper.findComponent(CircleOutlined).exists()).toBeFalsy()
    expect(wrapper.findComponent(LoadingOutlined).exists()).toBeTruthy()
  })
})

describe('ButtonGroup', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(ButtonGroup, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('props', async () => {
    const wrapper = mount(ButtonGroup, {
      props: {
        size: 'large',
        shape: 'round',
        pattern: 'gradient'
      },
      slots: {
        default: [Button, Button]
      }
    })

    expect(wrapper.classes()).toContain('size--large')
    expect(
      wrapper.findAllComponents('.fx-button').map(v => {
        return v.find('.fx-button').classes('size--large')
      })
    ).toEqual([true, true])

    expect(wrapper.classes()).toContain('shape--round')
    expect(
      wrapper.findAllComponents('.fx-button').map(v => {
        return v.find('.fx-button').classes('shape--round')
      })
    ).toEqual([true, true])

    expect(wrapper.classes()).toContain('pattern--gradient')
    expect(
      wrapper.findAllComponents('.fx-button').map(v => {
        return v.find('.fx-button').classes('pattern--gradient')
      })
    ).toEqual([true, true])
  })

  test('classes include "count--2" when render 2 buttons', async () => {
    const wrapper = mount(ButtonGroup, {
      slots: {
        default: [Button, Button]
      }
    })

    await nextTick()

    expect(wrapper.classes('count--2')).toBeTruthy()
  })
})
