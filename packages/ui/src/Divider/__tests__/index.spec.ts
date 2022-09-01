import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Divider } from '@/Divider'

describe('Divider', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Divider, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('title="title"', () => {
    const wrapper = shallowMount(Divider, {
      props: {
        title: 'title'
      }
    })

    expect(wrapper.classes()).toContain('has--title')
    expect(wrapper.text()).toBe('title')
  })

  test('dashed', () => {
    const wrapper = shallowMount(Divider, {
      props: {
        dashed: true
      }
    })

    expect(wrapper.classes()).toContain('border--dashed')
  })
})
