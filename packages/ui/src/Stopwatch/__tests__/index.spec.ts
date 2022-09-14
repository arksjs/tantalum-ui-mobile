import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Stopwatch } from '@/Stopwatch'

describe('Stopwatch', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Stopwatch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
