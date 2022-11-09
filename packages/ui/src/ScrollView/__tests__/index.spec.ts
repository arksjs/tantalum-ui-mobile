import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ScrollView } from '@/ScrollView'

describe('ScrollView', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(ScrollView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('scrollY=true', () => {
    const wrapper = shallowMount(ScrollView, {
      props: {
        scrollY: true
      }
    })

    expect(wrapper.classes()).toContain('scroll-y')
  })

  test('enablePullDirections', () => {
    const wrapper = shallowMount(ScrollView, {
      props: {
        enablePullDirections: 'up'
      }
    })

    expect(wrapper.find('.ta-scroll-view_pull-refresh').exists()).toBeTruthy()
  })
})
