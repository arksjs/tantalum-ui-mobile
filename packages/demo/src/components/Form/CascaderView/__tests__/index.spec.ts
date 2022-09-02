import { shallowMount } from '@vue/test-utils'
import { CascaderView } from '@/CascaderView'
import { cascadeOptions } from '../../Picker/data'

describe('CascaderView', () => {
  test('should render prop set options correctly', () => {
    const wrapper = shallowMount(CascaderView, {
      props: {
        options: cascadeOptions
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
