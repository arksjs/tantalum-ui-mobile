import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Stopwatch } from '@/Stopwatch'

describe('Stopwatch', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Stopwatch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
