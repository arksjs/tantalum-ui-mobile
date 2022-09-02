import { mount } from '@vue/test-utils'
import { StickyView, StickyViewItem } from '@/StickyView'

describe('StickyView', () => {
  test('StickyView should render default correctly', () => {
    const wrapper = mount(StickyView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('StickyViewItem should render default correctly', () => {
    const wrapper = mount(StickyViewItem, {
      props: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
