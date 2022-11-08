import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { SideTab } from '@/SideTab'
import { mixTabList, shortTabList, subTabList } from '../../Tab/__tests__/data'
import { nextTick } from 'vue'

describe('SideTab', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(SideTab, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot mixTabList', () => {
    const wrapper = mount(SideTab, {
      props: {
        options: mixTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot mixTabList', () => {
    const wrapper = shallowMount(SideTab, {
      props: {
        options: mixTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot subTabList', () => {
    const wrapper = mount(SideTab, {
      props: {
        options: subTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('switchTo & switchToIndex', async () => {
    const wrapper = mount(SideTab, {
      props: {
        options: shortTabList
      }
    })

    wrapper.findComponent(SideTab).vm.switchToIndex(1)
    await nextTick()
    expect(wrapper.findAll('.ta-side-tab_item')[1].classes()).toContain(
      'active'
    )

    wrapper.findComponent(SideTab).vm.switchTo(4)
    await nextTick()
    expect(wrapper.findAll('.ta-side-tab_item')[3].classes()).toContain(
      'active'
    )
  })
})
