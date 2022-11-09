import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Timeline } from '@/Timeline'
import { TimelineItem } from '@/TimelineItem'
import CircleOutlined from '@/Icon/icons/CircleOutlined'

describe('Timeline', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Timeline, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('TimelineItem', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(TimelineItem, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  const itemTitle = 'title'
  const itemContent = 'content'

  test('title & slot default', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        title: itemTitle
      },
      slots: {
        default: itemContent
      }
    })

    expect(wrapper.find('.ta-timeline-item_title').text()).toBe(itemTitle)
    expect(wrapper.find('.ta-timeline-item_content').text()).toBe(itemContent)
  })

  const color = '#52c41a'

  test('dotColor', () => {
    const wrapper = mount(TimelineItem, {
      props: {
        dotColor: color
      }
    })

    expect(wrapper.find('.ta-timeline-item_dot').attributes('style')).toContain(
      `border-color: ${color};`
    )
  })

  test('slot dot', () => {
    const wrapper = mount(TimelineItem, {
      slots: {
        dot: CircleOutlined
      }
    })

    expect(wrapper.findComponent(CircleOutlined)).toBeTruthy()
  })
})
