import { shallowMount } from '@vue/test-utils'
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
  test('should render prop set options correctly', () => {
    const wrapper = shallowMount(ActionSheet, {
      props: {
        options
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props showCancel=true & cancelText="Custom Cancel" correctly', () => {
    const wrapper = shallowMount(ActionSheet, {
      props: {
        showCancel: true,
        cancelText: 'Custom Cancel'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
