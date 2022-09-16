import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ScrollTab, ScrollTabItem } from '@/ScrollTab'

describe('ScrollTab', () => {
  test('snapshot', () => {
    const wrapper = mount(ScrollTab, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('ScrollTabItem', () => {
  test('snapshot', () => {
    const wrapper = mount(ScrollTabItem, {
      props: {
        name: 'name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
