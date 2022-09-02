import { shallowMount } from '@vue/test-utils'
import { DatePicker } from '@/DatePicker'

describe('DatePicker', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(DatePicker, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
