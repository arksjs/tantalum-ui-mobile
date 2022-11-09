import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Image } from '@/Image'
import { nextTick } from 'vue'

const imgUrl = 'https://cdn.fox2.cn/vfox/swiper/center-2.jpg'

describe('Image', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Image, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test.concurrent('mode', async () => {
    const wrapper = mount(Image, {})
    wrapper.vm.currentSrc = imgUrl

    await nextTick()
    const $img = wrapper.find('.ta-image_img')

    expect($img.classes()).toContain('mode--scale-to-fill')

    await wrapper.setProps({
      mode: 'aspectFit'
    })
    expect($img.classes()).toContain('mode--aspect-fit')

    await wrapper.setProps({
      mode: 'aspectFill'
    })
    expect($img.classes()).toContain('mode--aspect-fill')

    await wrapper.setProps({
      mode: 'widthFix'
    })
    expect($img.classes()).toContain('mode--width-fix')

    await wrapper.setProps({
      mode: 'top'
    })
    expect($img.classes()).toContain('mode--top')

    await wrapper.setProps({
      mode: 'bottom'
    })
    expect($img.classes()).toContain('mode--bottom')

    await wrapper.setProps({
      mode: 'left'
    })
    expect($img.classes()).toContain('mode--left')

    await wrapper.setProps({
      mode: 'right'
    })
    expect($img.classes()).toContain('mode--right')

    await wrapper.setProps({
      mode: 'top left'
    })
    expect($img.classes()).toContain('mode--top-left')

    await wrapper.setProps({
      mode: 'top right'
    })
    expect($img.classes()).toContain('mode--top-right')

    await wrapper.setProps({
      mode: 'bottom left'
    })
    expect($img.classes()).toContain('mode--bottom-left')

    await wrapper.setProps({
      mode: 'bottom right'
    })
    expect($img.classes()).toContain('mode--bottom-right')
  })

  test.concurrent('aspectRatio', async () => {
    const wrapper = mount(Image, {
      props: {
        aspectRatio: 1
      }
    })
    const $el = wrapper.find('.ta-image_ratio').element as HTMLElement
    expect($el.style.paddingTop).toContain('100%')
  })
})
