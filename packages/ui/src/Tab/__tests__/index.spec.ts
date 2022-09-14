import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Tab } from '@/Tab'
import { mixTabList, shortTabList, subTabList } from './data'
import { nextTick } from 'vue'

describe('Tab', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Tab, {
      props: {
        options: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot mixTabList', () => {
    const wrapper = mount(Tab, {
      props: {
        options: mixTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot mixTabList', () => {
    const wrapper = shallowMount(Tab, {
      props: {
        options: mixTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot subTabList', () => {
    const wrapper = mount(Tab, {
      props: {
        options: subTabList
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('switchTo & switchToIndex', async () => {
    const wrapper = mount(Tab, {
      props: {
        options: shortTabList
      }
    })

    wrapper.findComponent(Tab).vm.switchToIndex(1)
    await nextTick()
    expect(wrapper.findAll('.ak-tab_item')[1].classes()).toContain('active')

    wrapper.findComponent(Tab).vm.switchTo(4)
    await nextTick()
    expect(wrapper.findAll('.ak-tab_item')[3].classes()).toContain('active')
  })
})
