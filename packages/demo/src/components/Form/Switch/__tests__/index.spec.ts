import { shallowMount } from '@vue/test-utils'
import { Switch } from '@/Switch'

describe('Switch', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Switch, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop disabled=true correctly', () => {
    const wrapper = shallowMount(Switch, {
      props: {
        disabled: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop value=true correctly', () => {
    const wrapper = shallowMount(Switch, {
      props: {
        modelValue: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  // test('should formValue=true with input trigger change correctly', async () => {
  //   const wrapper = shallowMount(Switch, {})
  //   const input = wrapper.find('input[type="checkbox"]')

  //   await input.setChecked()

  //   expect(wrapper.vm.formValue).toBeTruthy()
  // })
})
