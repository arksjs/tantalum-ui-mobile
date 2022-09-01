import { shallowMount } from '@vue/test-utils'
import { CountUp } from '@/CountUp'

describe('CountUp', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(CountUp, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
