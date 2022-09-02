import { shallowMount } from '@vue/test-utils'
import { Calendar } from '@/Calendar'

describe('Calendar', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Calendar, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
