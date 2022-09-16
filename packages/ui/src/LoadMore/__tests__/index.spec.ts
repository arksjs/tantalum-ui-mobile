import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { LoadMore } from '@/LoadMore'
import { LoadingIcon } from '@/LoadingIcon'

describe('LoadMore', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(LoadMore, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('loading', () => {
    const wrapper = mount(LoadMore, {
      props: {
        loading: true
      }
    })
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy()
  })

  test('slot', () => {
    const content = 'content'
    const wrapper = mount(LoadMore, {
      slots: {
        default: content
      }
    })
    expect(wrapper.find('.ak-load-more_content').text()).toBe(content)
  })
})
