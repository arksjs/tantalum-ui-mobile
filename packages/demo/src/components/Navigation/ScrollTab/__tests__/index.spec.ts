import { mount } from '@vue/test-utils'
import { ScrollTab, ScrollTabItem } from '@/ScrollTab'

describe('ScrollTab', () => {
  test('ScrollTab should render default correctly', () => {
    const wrapper = mount(ScrollTab, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('ScrollTabItem should render default correctly', () => {
    const wrapper = mount(ScrollTabItem, {
      props: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
