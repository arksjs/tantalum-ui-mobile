import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { IndexView, IndexViewItem } from '@/IndexView'

describe('IndexView', () => {
  test('snapshot', () => {
    const wrapper = mount(IndexView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('IndexViewItem', () => {
  test('snapshot', () => {
    const wrapper = mount(IndexViewItem, {
      props: {
        name: 'name'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
