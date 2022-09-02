import { describe, test, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { Steps, Step } from '@/Steps'
import { baseList } from './data'
import { timeout } from '@arksjs/test-utils/utils'

const StepsTmpl = {
  template: `
<ak-steps v-model:activeIndex="stepIndex" :dot="dot">
  <ak-step v-for="(item, index) in steps" :key="index" :title="item.title">
    {{ item.content }}
  </ak-step>
</ak-steps>
  `,
  components: { 'ak-steps': Steps, 'ak-step': Step },
  props: {
    dot: Boolean
  },
  data() {
    return {
      stepIndex: -1,
      steps: baseList
    }
  }
}

describe('Steps', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Steps, {})
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('snapshot baseList', () => {
    const wrapper = mount(StepsTmpl)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dot', async () => {
    const wrapper = mount(StepsTmpl)

    await wrapper.setProps({
      dot: true
    })

    expect(wrapper.classes()).toContain('dot')
  })

  test('status', async () => {
    const wrapper = mount(StepsTmpl)

    const item0 = wrapper.findAll('.ak-steps-item')[0]

    // -1
    await timeout(200)
    expect(item0.classes('active')).toBeFalsy()
    expect(item0.classes('finish')).toBeFalsy()

    // 0
    await wrapper.setProps({
      activeIndex: 0
    })
    await timeout(200)
    expect(item0.classes('active')).toBeTruthy()
    expect(item0.classes('finish')).toBeFalsy()
  })
})

describe('Step', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(Step, {})
    expect(wrapper.html()).toMatchSnapshot()
  })
})
