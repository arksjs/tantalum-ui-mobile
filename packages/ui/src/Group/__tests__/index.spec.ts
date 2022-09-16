import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Group } from '@/Group'
import { Cell } from '@/Cell'
import CircleOutlined from '@/Icon/icons/CircleOutlined'

const title = 'title'

describe('Group', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Group, {
      props: {
        title
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('title', () => {
    const wrapper = shallowMount(Group, {
      props: {
        title
      }
    })

    expect(wrapper.find('.ak-group_title').text()).toBe(title)
  })

  test('strongHeader', () => {
    const wrapper = shallowMount(Group, {
      props: {
        title,
        strongHeader: true
      }
    })

    expect(wrapper.classes()).toContain('strong-header')
  })

  test('slots', () => {
    const wrapper = mount(Group, {
      props: { title },
      slots: {
        header: CircleOutlined,
        default: [Cell]
      }
    })

    expect(wrapper.findComponent(CircleOutlined).exists()).toBeTruthy()
    expect(wrapper.findComponent(Cell).exists()).toBeTruthy()
  })
})
