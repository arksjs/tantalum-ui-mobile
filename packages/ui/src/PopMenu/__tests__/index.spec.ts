import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { PopMenu } from '@/PopMenu'

const options = [
  {
    icon: 'HeartOutlined',
    name: 'Heart'
  },
  {
    icon: 'StarOutlined',
    name: 'Star'
  },
  {
    icon: 'CircleOutlined',
    name: 'Circle',
    disabled: true
  }
]

const selector = 'body'

describe('PopMenu', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(PopMenu, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('set options', () => {
    const wrapper = mount(PopMenu, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        options,
        selector
      }
    })

    expect(wrapper.findAll('.ta-pop-menu_item').length).toBe(3)
    expect(wrapper.findAll('.ta-pop-menu_item')[0].text()).toBe('Heart')
    expect(wrapper.findAll('.ta-pop-menu_item')[1].text()).toBe('Star')
    expect(wrapper.findAll('.ta-pop-menu_item')[2].text()).toBe('Circle')
  })

  test.concurrent('showMask', async () => {
    const wrapper = mount(PopMenu, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      }
    })
    expect(wrapper.find('.ta-popover').classes('no--mask')).toBeFalsy()

    await wrapper.setProps({
      showMask: false
    })
    expect(wrapper.find('.ta-popover').classes('no--mask')).toBeTruthy()
  })
})
