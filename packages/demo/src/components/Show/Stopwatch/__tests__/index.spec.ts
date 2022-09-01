import { shallowMount } from '@vue/test-utils'
import { Stopwatch } from '@/Stopwatch'

describe('Stopwatch', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Stopwatch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
