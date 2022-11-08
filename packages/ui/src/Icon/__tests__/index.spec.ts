import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { Icon } from '@/Icon'
import CircleOutlined from '@/Icon/icons/CircleOutlined'
import { markRaw } from 'vue'

const icon = 'strIcon'

describe('Icon', () => {
  test('snapshot', () => {
    const wrapper = mount(Icon, {
      props: {
        icon
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('prop icon is string', () => {
    const wrapper = mount(Icon, {
      props: {
        icon
      }
    })

    expect(wrapper.find('use').attributes('href')).toBe(`#${icon}`)
  })

  test('prop icon is Component', () => {
    const wrapper = mount(Icon, {
      props: {
        icon: markRaw(CircleOutlined)
      }
    })

    expect(wrapper.findComponent(CircleOutlined)).toBeTruthy()
  })

  test('prop size', () => {
    const wrapper = mount(Icon, {
      props: {
        icon,
        size: 40
      }
    })

    expect(wrapper.attributes('style')).toContain('--ta-icon-size: 40px;')
  })

  test('prop color', () => {
    const wrapper = mount(Icon, {
      props: {
        icon,
        color: '#6667AB'
      }
    })

    expect(wrapper.attributes('style')).toContain('--ta-icon-color: #6667AB;')
  })
})
