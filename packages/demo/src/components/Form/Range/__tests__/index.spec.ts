import { shallowMount } from '@vue/test-utils'
import { Range } from '@/Range'

describe('Range', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Range, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showValue=true correctly', () => {
    const wrapper = shallowMount(Range, {
      props: {
        showValue: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Range, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
