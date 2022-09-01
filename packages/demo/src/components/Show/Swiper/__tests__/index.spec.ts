import { shallowMount, mount } from '@vue/test-utils'
import { Swiper, SwiperItem } from '@/Swiper'

describe('Swiper', () => {
  test('Swiper should render default correctly', () => {
    const wrapper = shallowMount(Swiper, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('SwiperItem should render default correctly', () => {
    const wrapper = mount(SwiperItem, {
      props: {},
      slots: {
        default: 'content'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
