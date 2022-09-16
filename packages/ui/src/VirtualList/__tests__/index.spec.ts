import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { VirtualList } from '@/VirtualList'

describe('VirtualList', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(VirtualList, {
      props: {
        ids: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
