import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { ActionSheet } from '@/ActionSheet'

const options = [
  {
    name: 'Option 1'
  },
  {
    name: 'Option 2'
  },
  {
    name: 'Option 3'
  }
]

describe('ActionSheet', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(ActionSheet, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('set options', () => {
    const wrapper = mount(ActionSheet, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        options
      }
    })

    expect(wrapper.findAll('.ta-action-sheet_item').length).toBe(3)
    expect(wrapper.findAll('.ta-action-sheet_item')[0].text()).toBe('Option 1')
    expect(wrapper.findAll('.ta-action-sheet_item')[1].text()).toBe('Option 2')
    expect(wrapper.findAll('.ta-action-sheet_item')[2].text()).toBe('Option 3')
  })

  test.concurrent('showCancel', async () => {
    const wrapper = mount(ActionSheet, {
      global: {
        stubs: { teleport: true }
      }
    })
    expect(wrapper.findAll('.ta-action-sheet_list').length).toBe(1)

    await wrapper.setProps({
      showCancel: true
    })
    expect(wrapper.findAll('.ta-action-sheet_list').length).toBe(2)
  })

  test.concurrent('cancelText', async () => {
    const wrapper = mount(ActionSheet, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        showCancel: true,
        cancelText: 'cancelText'
      }
    })

    expect(wrapper.findAll('.ta-action-sheet_list')[1].find('.ta-action-sheet_item').text()).toBe(
      'cancelText'
    )
  })
})
