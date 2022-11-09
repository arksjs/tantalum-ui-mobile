import { describe, expect, test } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import Row from '@/Row'
import Col from '@/Col'

describe('Col', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Col, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('span', () => {
    const wrapper = mount(Col, {
      props: { span: 12 }
    })
    expect(wrapper.classes()).toContain('ta-col-12')
  })

  test('pull', () => {
    const wrapper = mount(Col, {
      props: { pull: 3 }
    })
    expect(wrapper.classes()).toContain('ta-col-pull-3')
  })

  test('push', () => {
    const wrapper = mount(Col, {
      props: { push: 3 }
    })
    expect(wrapper.classes()).toContain('ta-col-push-3')
  })

  test('gutter', () => {
    const wrapper = mount(Row, {
      props: { gutter: 10 },
      slots: {
        default: [Col]
      }
    })

    const colEl = wrapper.findComponent('.ta-col').element as HTMLElement
    expect(colEl.style.paddingLeft === '5px').toBeTruthy()
    expect(colEl.style.paddingRight === '5px').toBeTruthy()
  })
})

describe('Row', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Row, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('gutter', () => {
    const wrapper = mount(Row, {
      props: { gutter: 10 }
    })

    const rowEl = wrapper.element as HTMLElement
    expect(rowEl.style.marginLeft === '-5px').toBeTruthy()
    expect(rowEl.style.marginRight === '-5px').toBeTruthy()
  })

  test('justify', () => {
    const wrapper = mount(Row, {
      props: { justify: 'end' }
    })
    expect(wrapper.classes()).toContain('justify--end')
  })

  test('align', () => {
    const wrapper = mount(Row, {
      props: { align: 'bottom' }
    })
    expect(wrapper.classes()).toContain('align--bottom')
  })
})
