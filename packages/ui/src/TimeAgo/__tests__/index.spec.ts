import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { TimeAgo } from '@/TimeAgo'
import { timeout } from '@arksjs/test-utils/utils'

describe('TimeAgo', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(TimeAgo, {
      props: {
        time: new Date()
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent(
    'interval',
    async () => {
      const wrapper = shallowMount(TimeAgo, {
        props: {
          time: new Date(),
          interval: 1
        }
      })

      expect(wrapper.text()).toBe('刚刚')

      await timeout(11 * 1000)

      expect(wrapper.text()).toBe('10 秒前')
    },
    12 * 1000
  )
})
