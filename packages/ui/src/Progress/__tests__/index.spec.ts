import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Progress } from '@/Progress'
import { h } from 'vue'

describe('Progress', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Progress, {
      props: { percentage: 0 }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('prop percentage', async () => {
    const wrapper = shallowMount(Progress, {
      props: { percentage: 0 }
    })
    expect(wrapper.vm.progress).toBe('0%')

    await wrapper.setProps({ percentage: 50 })
    expect(wrapper.vm.progress).toBe('50%')

    await wrapper.setProps({ percentage: 100 })
    expect(wrapper.vm.progress).toBe('100%')
  })

  test('prop showText', () => {
    const wrapper = shallowMount(Progress, {
      props: { percentage: 50, showText: true }
    })

    expect(wrapper.find('.ta-progress_text').text()).toBe('50%')
  })

  test('slot default', () => {
    const wrapper = shallowMount(Progress, {
      props: { percentage: 50, showText: true },
      slots: {
        default: props => {
          return h('span', {}, [`Sale ${props.progress}`])
        }
      }
    })

    expect(wrapper.find('.ta-progress_text').find('span').html()).toBe(
      '<span>Sale 50%</span>'
    )
  })
})
