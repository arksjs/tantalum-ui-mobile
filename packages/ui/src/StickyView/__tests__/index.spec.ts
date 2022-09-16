import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { StickyView, StickyViewItem } from '@/StickyView'

describe('StickyView', () => {
  test('snapshot', () => {
    const wrapper = mount(StickyView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('StickyViewItem', () => {
  test('snapshot', () => {
    const wrapper = mount(StickyViewItem, {
      props: {
        name: 'name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
