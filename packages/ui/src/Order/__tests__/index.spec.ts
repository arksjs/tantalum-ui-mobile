import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Order } from '@/Order'

describe('Order', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Order, {
      props: {
        items: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
