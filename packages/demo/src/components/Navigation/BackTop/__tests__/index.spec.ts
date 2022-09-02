import { shallowMount, mount } from '@vue/test-utils'
import { BackTop } from '@/BackTop'

describe('BackTop', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(BackTop, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop offset=[0, -50] correctly', () => {
    const wrapper = shallowMount(BackTop, {
      props: {
        offset: [0, -50]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set default slot correctly', () => {
    const wrapper = mount(BackTop, {
      slots: {
        default: 'BackTop'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('test visible by scroll', async () => {
    const wrapper = mount(BackTop, {
      attachTo: document.body
    })

    expect(wrapper.isVisible()).toBeFalsy()
  })
})
