import { shallowMount } from '@vue/test-utils'
import { PickerView } from '@/PickerView'
import { cascadeOptions } from '../../Picker/data'

describe('PickerView', () => {
  test('should render prop set options correctly', () => {
    const wrapper = shallowMount(PickerView, {
      props: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
