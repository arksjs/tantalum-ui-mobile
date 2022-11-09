import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Skeleton } from '@/Skeleton'
import { SkeletonAvatar } from '@/SkeletonAvatar'
import { SkeletonImage } from '@/SkeletonImage'
import { SkeletonTitle } from '@/SkeletonTitle'
import { SkeletonParagraph } from '@/SkeletonParagraph'
import { SkeletonButton } from '@/SkeletonButton'

describe('Skeleton', () => {
  test('snapshot', () => {
    const wrapper = mount(Skeleton, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('avatar', () => {
    const wrapper = mount(Skeleton, {
      props: {
        avatar: true
      }
    })
    expect(wrapper.findComponent(SkeletonAvatar).exists()).toBeTruthy()
  })

  test('animated', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animated: true
      }
    })
    expect(wrapper.findComponent(SkeletonTitle).classes()).toContain('animated')
    expect(wrapper.findComponent(SkeletonParagraph).classes()).toContain(
      'animated'
    )
  })

  test('loading', async () => {
    const content = 'content'
    const wrapper = mount(Skeleton, {
      slots: {
        default: content
      }
    })
    expect(wrapper.classes()).toContain('ta-skeleton')

    await wrapper.setProps({
      loading: false
    })
    expect(wrapper.html()).toBe(content)
  })

  test('slot layout', () => {
    const wrapper = mount(Skeleton, {
      slots: {
        layout: [
          SkeletonImage,
          SkeletonTitle,
          SkeletonParagraph,
          SkeletonButton
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('SkeletonAvatar', () => {
  test('shape', async () => {
    const wrapper = shallowMount(SkeletonAvatar, {})
    expect(wrapper.classes()).toContain('shape--default')

    await wrapper.setProps({
      shape: 'circle'
    })
    expect(wrapper.classes()).toContain('shape--circle')
  })

  test('animated', () => {
    const wrapper = shallowMount(SkeletonAvatar, {
      props: {
        animated: true
      }
    })
    expect(wrapper.classes()).toContain('animated')
  })
})

describe('SkeletonImage', () => {
  test('animated', () => {
    const wrapper = shallowMount(SkeletonImage, {
      props: {
        animated: true
      }
    })
    expect(wrapper.classes()).toContain('animated')
  })
})

describe('SkeletonTitle ', () => {
  test('animated', () => {
    const wrapper = shallowMount(SkeletonTitle, {
      props: {
        animated: true
      }
    })
    expect(wrapper.classes()).toContain('animated')
  })
})

describe('SkeletonParagraph', () => {
  test('row', () => {
    const wrapper = shallowMount(SkeletonParagraph, {
      props: {
        row: 5
      }
    })
    expect(wrapper.findAll('li').length).toBe(5)
  })

  test('animated', () => {
    const wrapper = shallowMount(SkeletonParagraph, {
      props: {
        animated: true
      }
    })
    expect(wrapper.classes()).toContain('animated')
  })
})

describe('SkeletonButton', () => {
  test('shape', async () => {
    const wrapper = shallowMount(SkeletonButton, {})
    expect(wrapper.classes()).toContain('shape--default')

    await wrapper.setProps({
      shape: 'round'
    })
    expect(wrapper.classes()).toContain('shape--round')
  })

  test('animated', () => {
    const wrapper = shallowMount(SkeletonButton, {
      props: {
        animated: true
      }
    })
    expect(wrapper.classes()).toContain('animated')
  })
})
