import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { ImageUploader } from '@/ImageUploader'

describe('ImageUploader', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(ImageUploader, {})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
