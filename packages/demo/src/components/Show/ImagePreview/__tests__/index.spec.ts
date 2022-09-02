import { shallowMount } from '@vue/test-utils'
import { ImagePreview } from '@/ImagePreview'

const imageUrls = [
  'https://cdn.fox2.cn/vfox/swiper/different-1.jpg',
  'https://cdn.fox2.cn/vfox/swiper/different-2.jpg',
  'https://cdn.fox2.cn/vfox/swiper/different-3.jpg'
]

describe('ImagePreview', () => {
  test('should render props set urls correctly', () => {
    const wrapper = shallowMount(ImagePreview, {
      props: {
        urls: imageUrls
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
