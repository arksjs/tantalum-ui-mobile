import { shallowMount } from '@vue/test-utils'
import { DatePickerView } from '@/DatePickerView'

describe('DatePickerView', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(DatePickerView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
