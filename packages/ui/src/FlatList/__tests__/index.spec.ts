import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { FlatList } from '@/FlatList'

describe('FlatList', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(FlatList, {
      props: {
        ids: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
