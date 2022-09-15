import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { SearchBar } from '@/SearchBar'
import { timeout } from '@arksjs/test-utils/utils'
// import { placeholders } from '../data'

describe('SearchBar', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(SearchBar, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('showCancel=true', () => {
    const wrapper = mount(SearchBar, {
      props: {
        showCancel: true
      }
    })

    expect(wrapper.find('.ak-search_cancel-button').exists()).toBeTruthy()
  })

  test.concurrent('set placeholders', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        placeholders: ['ph1', 'ph2', 'ph3'],
        placeholderInterval: 50
      }
    })

    expect(wrapper.vm.placeholder).toBe('ph1')

    await timeout(70)
    expect(wrapper.vm.placeholder).toBe('ph2')
  })
})
