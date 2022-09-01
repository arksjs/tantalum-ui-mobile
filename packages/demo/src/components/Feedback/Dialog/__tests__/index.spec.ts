import { shallowMount } from '@vue/test-utils'
import { Dialog } from '@/Dialog'

describe('Dialog', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Dialog, {
      props: {
        title: 'title',
        content: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showCancel=false correctly', () => {
    const wrapper = shallowMount(Dialog, {
      props: {
        title: 'title',
        content: 'content',
        showCancel: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
