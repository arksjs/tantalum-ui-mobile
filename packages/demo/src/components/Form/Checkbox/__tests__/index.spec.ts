import { shallowMount, mount } from '@vue/test-utils'
import { Checkbox, CheckboxGroup } from '@/Checkbox'

describe('Checkbox', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Checkbox, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Checkbox, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('CheckboxGroup', () => {
  test('should render 2 Checkbox slot correctly', () => {
    const wrapper = mount(CheckboxGroup, {
      slots: {
        default: [Checkbox, Checkbox]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(CheckboxGroup, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
