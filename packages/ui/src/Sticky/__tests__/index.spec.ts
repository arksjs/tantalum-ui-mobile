import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Sticky } from '@/Sticky'

describe('Sticky', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Sticky, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
