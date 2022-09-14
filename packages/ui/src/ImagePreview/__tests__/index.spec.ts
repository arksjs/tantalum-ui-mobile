import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ImagePreview } from '@/ImagePreview'

// const imageUrls = [
//   'https://cdn.fox2.cn/vfox/swiper/different-1.jpg',
//   'https://cdn.fox2.cn/vfox/swiper/different-2.jpg',
//   'https://cdn.fox2.cn/vfox/swiper/different-3.jpg'
// ]

describe('ImagePreview', () => {
  test.concurrent('snapshot', () => {
    const wrapper = shallowMount(ImagePreview, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        urls: []
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
