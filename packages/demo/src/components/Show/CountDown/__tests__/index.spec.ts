import { shallowMount } from '@vue/test-utils'
import { CountDown } from '@/CountDown'

describe('CountDown', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(CountDown, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render prop showDays=true correctly', () => {
    const wrapper = shallowMount(CountDown, {
      props: {
        showDays: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
