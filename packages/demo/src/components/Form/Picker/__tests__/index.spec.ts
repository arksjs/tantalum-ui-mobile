import { shallowMount } from '@vue/test-utils'
import { Picker } from '@/Picker'
import { cascadeOptions } from '../data'

describe('Picker', () => {
  test('should render prop set options correctly', () => {
    const wrapper = shallowMount(Picker, {
      props: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
