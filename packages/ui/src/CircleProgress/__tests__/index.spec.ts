import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { CircleProgress } from '@/CircleProgress'
import { h } from 'vue'
import { LoadingIcon } from '@/LoadingIcon'

describe('CircleProgress', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 0 }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('prop percentage', async () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 0 }
    })
    expect(wrapper.vm.progress).toBe('0%')

    await wrapper.setProps({ percentage: 50 })
    expect(wrapper.vm.progress).toBe('50%')

    await wrapper.setProps({ percentage: 100 })
    expect(wrapper.vm.progress).toBe('100%')
  })

  test('prop size', async () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 0, size: 80 }
    })
    expect(wrapper.attributes('style')).toContain('font-size: 11.9')
    expect(wrapper.findComponent(LoadingIcon).attributes('size')).toBe('80')
  })

  test('prop strokeWidth', async () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 0, strokeWidth: 2 }
    })
    expect(
      wrapper.find('.fx-circle-progress_text').attributes('style')
    ).toContain('padding: 2px;')
    expect(
      wrapper.get('.fx-circle-progress_bar').attributes('strokewidth')
    ).toBe('2')
  })

  test('slot default', () => {
    const wrapper = shallowMount(CircleProgress, {
      props: { percentage: 50, showText: true },
      slots: {
        default: props => {
          return h('span', {}, [`Sale ${props.progress}`])
        }
      }
    })

    expect(wrapper.find('.fx-circle-progress_text').find('span').html()).toBe(
      '<span>Sale 50%</span>'
    )
  })
})
