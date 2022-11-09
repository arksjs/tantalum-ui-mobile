import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Result } from '@/Result'
import InfoCircleFilled from '@/Icon/icons/InfoCircleFilled'
import WarningFilled from '@/Icon/icons/WarningFilled'
import CheckCircleFilled from '@/Icon/icons/CheckCircleFilled'
import CloseCircleFilled from '@/Icon/icons/CloseCircleFilled'

describe('Result', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Result, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('type', async () => {
    const wrapper = mount(Result, {
      props: {
        type: 'info'
      }
    })
    expect(wrapper.classes()).toContain('type--info')
    expect(wrapper.findComponent(InfoCircleFilled).exists()).toBeTruthy()

    await wrapper.setProps({
      type: 'warning'
    })
    expect(wrapper.classes()).toContain('type--warning')
    expect(wrapper.findComponent(WarningFilled).exists()).toBeTruthy()

    await wrapper.setProps({
      type: 'success'
    })
    expect(wrapper.classes()).toContain('type--success')
    expect(wrapper.findComponent(CheckCircleFilled).exists()).toBeTruthy()

    await wrapper.setProps({
      type: 'fail'
    })
    expect(wrapper.classes()).toContain('type--fail')
    expect(wrapper.findComponent(CloseCircleFilled).exists()).toBeTruthy()
  })

  const title = 'title'
  const description = 'description'
  test('title & description', () => {
    const wrapper = shallowMount(Result, {
      props: {
        title,
        description
      }
    })
    expect(wrapper.find('.ta-result_title').text()).toBe(title)
    expect(wrapper.find('.ta-result_description').text()).toBe(description)
  })

  test('showBack', () => {
    const wrapper = mount(Result, {
      props: {
        showBack: true
      }
    })
    expect(wrapper.findAllComponents('.ta-button').length).toBe(2)
  })

  const confirmText = 'confirmText'
  const backText = 'backText'

  test('confirmText & backText', () => {
    const wrapper = mount(Result, {
      props: {
        showBack: true,
        confirmText,
        backText
      }
    })
    expect(
      wrapper
        .findAllComponents('.ta-button')
        .map(v => v.find('.ta-button').text())
    ).toEqual([confirmText, backText])
  })
})
