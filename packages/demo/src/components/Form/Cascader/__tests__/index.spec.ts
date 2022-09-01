import { shallowMount } from '@vue/test-utils'
import { Cascader } from '@/Cascader'
import { cascadeOptions } from '../../Picker/data'

describe('Cascader', () => {
  test('should render prop set options correctly', () => {
    const wrapper = shallowMount(Cascader, {
      props: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
