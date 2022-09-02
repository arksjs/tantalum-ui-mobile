import { shallowMount } from '@vue/test-utils'
import { Pagination } from '@/Pagination'

describe('Pagination', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(Pagination, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set default slot correctly', () => {
    const wrapper = shallowMount(Pagination, {
      scopedSlots: {
        default: `Page {{ props.current }}`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set prev & next slots correctly', () => {
    const wrapper = shallowMount(Pagination, {
      slots: {
        prev: 'Prev',
        next: 'Next'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
