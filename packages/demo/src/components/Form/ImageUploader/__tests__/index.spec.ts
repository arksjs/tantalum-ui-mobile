import { shallowMount } from '@vue/test-utils'
import { ImageUploader } from '@/ImageUploader'

describe('ImageUploader', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(ImageUploader, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
