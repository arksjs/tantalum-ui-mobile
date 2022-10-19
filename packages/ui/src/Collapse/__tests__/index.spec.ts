import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Collapse, CollapseItem } from '@/Collapse'
import { baseList } from './data'
import CircleOutlined from '@/Icon/icons/CircleOutlined'
import { markRaw } from 'vue'

const CollapseTmpl = {
  template: `
  <ak-collapse v-model="modelValue" :accordion="accordion">
    <ak-collapse-item v-for="(item, index) in list" :key="item.title" :name="item.title" :title="item.title">
      {{ item.content }}
    </ak-collapse-item>
  </ak-collapse>
    `,
  components: { 'ak-collapse': Collapse, 'ak-collapse-item': CollapseItem },
  props: {
    accordion: Boolean
  },
  data() {
    return {
      modelValue: [],
      list: baseList
    }
  }
}

describe('Collapse', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Collapse, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('modelValue', async () => {
    const wrapper = mount(CollapseTmpl)

    expect(wrapper.vm.modelValue).toEqual([])

    // click item 1
    await wrapper.find('.ak-collapse-item_header').trigger('click')
    expect(wrapper.vm.modelValue).toEqual(['title 1'])

    // click item 2
    await wrapper.findAll('.ak-collapse-item_header')[1].trigger('click')
    expect(wrapper.vm.modelValue).toEqual(['title 1', 'title 2'])

    // click item 1
    await wrapper.find('.ak-collapse-item_header').trigger('click')
    expect(wrapper.vm.modelValue).toEqual(['title 2'])
  })

  test('accordion', async () => {
    const wrapper = mount(CollapseTmpl)
    await wrapper.setProps({
      accordion: true
    })

    expect(wrapper.vm.modelValue).toEqual([])

    // click item 1
    await wrapper.find('.ak-collapse-item_header').trigger('click')
    expect(wrapper.vm.modelValue).toEqual(['title 1'])

    // click item 2
    await wrapper.findAll('.ak-collapse-item_header')[1].trigger('click')
    expect(wrapper.vm.modelValue).toEqual(['title 2'])

    // click item 1
    await wrapper.find('.ak-collapse-item_header').trigger('click')
    expect(wrapper.vm.modelValue).toEqual(['title 1'])
  })
})

describe('CollapseItem', () => {
  const name = 'name'

  test('snapshot', () => {
    const wrapper = shallowMount(CollapseItem, {
      props: {
        name
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('title', () => {
    const title = 'title'
    const wrapper = mount(CollapseItem, {
      props: {
        name,
        title
      }
    })

    expect(wrapper.find('.ak-cell_label').text()).toBe(title)
  })

  test('icon', () => {
    const wrapper = mount(CollapseItem, {
      props: {
        name,
        icon: markRaw(CircleOutlined)
      }
    })

    expect(wrapper.findComponent(CircleOutlined).exists).toBeTruthy()
  })

  test('disabled', () => {
    const wrapper = mount(CollapseItem, {
      props: {
        name,
        disabled: true
      }
    })

    expect(wrapper.find('.ak-collapse-item_header').classes()).toContain(
      'disabled'
    )
  })
})
