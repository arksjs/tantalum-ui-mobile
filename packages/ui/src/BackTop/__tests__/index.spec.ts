import { describe, test, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { BackTop } from '@/BackTop'

describe('BackTop', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(BackTop, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('test visible by scroll', async () => {
    const wrapper = mount(BackTop, {
      attachTo: document.body
    })

    expect(wrapper.isVisible()).toBeFalsy()
  })
})
