import { describe, test, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import { Swiper, SwiperItem } from '@/Swiper'

describe('Swiper', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Swiper, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('indicatorDots=true', () => {
    const wrapper = shallowMount(Swiper, {
      props: { indicatorDots: true }
    })

    expect(wrapper.find('.ta-swiper_indicators').exists()).toBeTruthy()
  })

  test('length', () => {
    const wrapper = mount(Swiper, {
      slots: {
        default: [1, 2, 3, 4].map(() => SwiperItem)
      }
    })

    expect(wrapper.findAll('.ta-swiper-item').length).toBe(4)
  })
})

describe('SwiperItem', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(SwiperItem, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
