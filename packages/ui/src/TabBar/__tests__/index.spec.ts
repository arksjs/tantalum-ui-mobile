import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { TabBar } from '@/TabBar'
import { nextTick } from 'vue'
import { baseList, badgeList } from './data'

describe('TabBar', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(TabBar, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot badgeList', () => {
    const wrapper = mount(TabBar, {
      props: {
        options: badgeList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('switchTo & switchToIndex', async () => {
    const wrapper = mount(TabBar, {
      props: {
        options: baseList
      }
    })

    wrapper.findComponent(TabBar).vm.switchToIndex(1)
    await nextTick()
    expect(wrapper.findAll('.fx-tab-bar_item')[1].classes()).toContain('active')

    wrapper.findComponent(TabBar).vm.switchTo(4)
    await nextTick()
    expect(wrapper.findAll('.fx-tab-bar_item')[3].classes()).toContain('active')
  })
})
