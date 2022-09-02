import { shallowMount } from '@vue/test-utils'
import { PopDialog } from '@/PopDialog'

describe('PopDialog', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(PopDialog, {
      props: {
        selector: '#test',
        title: 'title',
        content: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showCancel=false correctly', () => {
    const wrapper = shallowMount(PopDialog, {
      props: {
        selector: '#test',
        title: 'title',
        content: 'content',
        showCancel: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
