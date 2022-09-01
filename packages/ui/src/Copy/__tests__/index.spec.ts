import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Copy } from '@/Copy'

describe('Copy', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(Copy, {
      props: {
        text: 'content'
      },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
