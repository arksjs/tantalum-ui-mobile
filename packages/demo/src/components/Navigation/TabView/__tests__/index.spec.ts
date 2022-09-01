import { mount, shallowMount } from '@vue/test-utils'
import { TabView, TabViewItem } from '@/TabView'

describe('TabView', () => {
  test('TabView should render default correctly', () => {
    const wrapper = shallowMount(TabView, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('TabViewItem should render default correctly', () => {
    const wrapper = mount(TabViewItem, {
      props: { name: 'item-1' },
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
