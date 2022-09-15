import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Cascader, CascaderPopup, CascaderView } from '@/Cascader'

describe('Cascader', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Cascader, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('CascaderPopup', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(CascaderPopup, {
      props: {
        options: []
      },
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('CascaderView', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(CascaderView, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
