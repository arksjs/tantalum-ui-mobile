import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { Pagination } from '@/Pagination'

describe('Pagination', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Pagination, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('total & change', async () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        total: 5
      }
    })
    expect(wrapper.find('.ta-pagination_content').text()).toBe('1 / 5')

    await wrapper.find('.ta-pagination_next').trigger('click')
    expect(wrapper.find('.ta-pagination_content').text()).toBe('2 / 5')

    await wrapper.find('.ta-pagination_next').trigger('click')
    await wrapper.find('.ta-pagination_next').trigger('click')
    await wrapper.find('.ta-pagination_next').trigger('click')
    expect(wrapper.find('.ta-pagination_content').text()).toBe('5 / 5')

    // 超出了
    await wrapper.find('.ta-pagination_next').trigger('click')
    expect(wrapper.find('.ta-pagination_content').text()).toBe('5 / 5')
  })

  test('slots prev & next', () => {
    const wrapper = shallowMount(Pagination, {
      slots: {
        prev: 'Prev',
        next: 'Next'
      }
    })

    expect(wrapper.find('.ta-pagination_prev').text()).toBe('Prev')
    expect(wrapper.find('.ta-pagination_next').text()).toBe('Next')
  })
})
