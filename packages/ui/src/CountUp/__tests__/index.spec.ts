import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { CountUp } from '@/CountUp'
import { timeout } from '@arksjs/test-utils/utils'

describe('CountUp', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(CountUp, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('thousands=true', async () => {
    const wrapper = shallowMount(CountUp, {
      props: {
        thousands: true,
        number: 1000,
        speed: 100
      }
    })

    await timeout(120)
    expect(wrapper.vm.content).toBe('1,000')
  })

  test.concurrent('decimalDigits=2', async () => {
    const wrapper = shallowMount(CountUp, {
      props: {
        decimalDigits: 2,
        number: 1000,
        speed: 100
      }
    })

    await timeout(120)
    expect(wrapper.vm.content).toBe('1000.00')
  })
})
