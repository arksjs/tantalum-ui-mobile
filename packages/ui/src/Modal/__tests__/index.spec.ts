import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Modal } from '@/Modal'
import CloseCircleFilled from '@/Icon/icons/CloseCircleFilled'
import { timeout } from '@arksjs/test-utils/utils'

describe('Modal', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Modal, {
      global: {
        stubs: { teleport: true }
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('showClose', async () => {
    const wrapper = mount(Modal, {
      global: {
        stubs: { teleport: true }
      }
    })
    expect(wrapper.findComponent(CloseCircleFilled).exists()).toBeTruthy()

    await wrapper.setProps({
      showClose: false
    })
    expect(wrapper.findComponent(CloseCircleFilled).exists()).toBeFalsy()
  })

  test('maskClosable', async () => {
    const wrapper = mount(Modal, {
      global: {
        stubs: { teleport: true }
      },
      props: {
        visible: true
      }
    })

    await wrapper.find('.ta-mask').trigger('click')
    await timeout(500)
    expect(wrapper.vm.isShow).toBeTruthy()

    await wrapper.setProps({
      maskClosable: true
    })
    await wrapper.find('.ta-mask').trigger('click')
    await timeout(500)
    expect(wrapper.vm.isShow).toBeFalsy()
  })
})
