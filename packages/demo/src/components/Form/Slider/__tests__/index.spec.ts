import { shallowMount } from '@vue/test-utils'
import { Slider } from '@/Slider'

describe('Slider', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Slider, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showValue=true correctly', () => {
    const wrapper = shallowMount(Slider, {
      props: {
        showValue: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Slider, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
