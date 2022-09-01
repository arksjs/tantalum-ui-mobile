import { shallowMount } from '@vue/test-utils'
import { Order } from '@/Order'

describe('Order', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(Order, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
