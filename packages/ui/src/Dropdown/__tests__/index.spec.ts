import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Dropdown } from '@/Dropdown'

describe('Dropdown', () => {
  const selector = 'body'

  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Dropdown, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('slot default', async () => {
    const content = 'content'
    const wrapper = mount(Dropdown, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        selector
      },
      slots: {
        default: content
      }
    })
    expect(wrapper.find('.ak-dropdown_inner').text()).toBe(content)
  })
})
