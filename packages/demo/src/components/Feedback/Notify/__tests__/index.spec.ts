import { shallowMount } from '@vue/test-utils'
import { Notify } from '@/Notify'

describe('Notify', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Notify, {
      props: {
        title: '通知文本'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="success" correctly', () => {
    const wrapper = shallowMount(Notify, {
      props: { title: '成功文本', type: 'success' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="warning" correctly', () => {
    const wrapper = shallowMount(Notify, {
      props: { title: '警告文本', type: 'warning' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop type="danger" correctly', () => {
    const wrapper = shallowMount(Notify, {
      props: { title: '危险文本', type: 'danger' }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
