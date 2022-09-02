import { shallowMount } from '@vue/test-utils'
import { Rate } from '@/Rate'

describe('Rate', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Rate, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop count=8 correctly', () => {
    const wrapper = shallowMount(Rate, {
      props: {
        count: 8
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Rate, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
