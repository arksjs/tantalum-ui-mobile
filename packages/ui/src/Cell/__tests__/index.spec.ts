import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Cell } from '@/Cell'
import CircleOutlined from '@/Icon/icons/CircleOutlined'

const label = 'label'
const content = 'content'
const description = 'description'

describe('Cell', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Cell, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('label & content & description', () => {
    const wrapper = shallowMount(Cell, {
      props: {
        label,
        content,
        description
      }
    })

    expect(wrapper.find('.ta-cell_label').text()).toBe(label)
    expect(wrapper.find('.ta-cell_content').text()).toBe(content)
    expect(wrapper.find('.ta-cell_body').text()).toBe(description)
  })

  test('clickable', async () => {
    const wrapper = mount(Cell, {
      props: {
        clickable: true
      }
    })

    expect(wrapper.classes()).toContain('clickable')
  })

  test('isLink & arrowDirection', async () => {
    const wrapper = mount(Cell, {
      props: {
        isLink: true
      }
    })

    // isLink
    expect(wrapper.find('.ta-cell_link-icon').exists()).toBeTruthy()
    expect(wrapper.find('.ta-cell_link-icon').classes()).toContain(
      'arrow--right'
    )

    // arrowDirection
    await wrapper.setProps({
      arrowDirection: 'up'
    })
    expect(wrapper.find('.ta-cell_link-icon').classes()).toContain('arrow--up')
    await wrapper.setProps({
      arrowDirection: 'down'
    })
    expect(wrapper.find('.ta-cell_link-icon').classes()).toContain(
      'arrow--down'
    )
    await wrapper.setProps({
      arrowDirection: 'left'
    })
    expect(wrapper.find('.ta-cell_link-icon').classes()).toContain(
      'arrow--left'
    )
  })

  test('slots', () => {
    const wrapper = shallowMount(Cell, {
      slots: {
        icon: CircleOutlined,
        default: content
      }
    })

    expect(wrapper.findComponent(CircleOutlined).exists()).toBeTruthy()
    expect(wrapper.find('.ta-cell_content').text()).toBe(content)
  })
})
