import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { CountDown } from '@/CountDown'
import { timeout } from '@arksjs/test-utils/utils'

describe('CountDown', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(CountDown, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('initialTiming=50', async () => {
    const wrapper = shallowMount(CountDown, {
      props: {
        initialTiming: 50
      }
    })
    expect(wrapper.vm.countTime.time).toBe(50)

    await timeout(70)
    expect(wrapper.vm.countTime.time).toBe(0)
  })
})
