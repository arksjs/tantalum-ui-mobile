import { shallowMount } from '@vue/test-utils'
import { Input } from '@/Input'

describe('Input', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Input, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showClear=true correctly', () => {
    const wrapper = shallowMount(Input, {
      props: {
        showClear: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop maxlength=200 correctly', () => {
    const wrapper = shallowMount(Input, {
      props: {
        maxlength: 200
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Input, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
