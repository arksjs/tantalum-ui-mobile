import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Empty } from '@/Empty'
import { Image } from '@/Image'

describe('Empty', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Empty, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('description="description"', () => {
    const wrapper = shallowMount(Empty, {
      props: {
        description: 'description'
      }
    })

    expect(wrapper.find('.ta-empty_description').text()).toBe('description')
  })

  test('slot image', () => {
    const wrapper = shallowMount(Empty, {
      slots: {
        image: Image
      }
    })

    expect(wrapper.findComponent(Image).exists()).toBeTruthy()
  })
})
