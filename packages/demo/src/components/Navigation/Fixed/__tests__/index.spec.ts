import { shallowMount } from '@vue/test-utils'
import { Fixed } from '@/Fixed'

const defaultSlot = 'Fixed'

describe('Fixed', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(Fixed, {
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop placement="top" correctly', () => {
    const wrapper = shallowMount(Fixed, {
      props: {
        placement: 'top'
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop background="#ffffff" correctly', () => {
    const wrapper = shallowMount(Fixed, {
      props: {
        background: '#ffffff'
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop spaceHold=true correctly', () => {
    const wrapper = shallowMount(Fixed, {
      props: {
        spaceHold: true
      },
      slots: {
        default: defaultSlot
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
