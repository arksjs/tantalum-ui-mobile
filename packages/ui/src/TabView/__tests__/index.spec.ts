import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { TabView, TabViewItem } from '@/TabView'

describe('TabView', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(TabView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('TabViewItem', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(TabViewItem, {
      props: {
        name: 'name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
