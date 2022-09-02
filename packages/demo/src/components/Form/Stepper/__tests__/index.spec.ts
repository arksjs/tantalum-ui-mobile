import { shallowMount } from '@vue/test-utils'
import { Stepper } from '@/Stepper'

describe('Stepper', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Stepper, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Stepper, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
