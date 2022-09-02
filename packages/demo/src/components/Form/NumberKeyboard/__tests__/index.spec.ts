import { shallowMount } from '@vue/test-utils'
import { NumberKeyboard } from '@/NumberKeyboard'

describe('NumberKeyboard', () => {
  test('should render default correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props customKey="." correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      props: {
        customKey: '.'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props type="rightColumn" correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      props: {
        type: 'rightColumn'
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render props type="rightColumn" and customKey=["00", "."] correctly', () => {
    const wrapper = shallowMount(NumberKeyboard, {
      props: {
        type: 'rightColumn',
        customKey: ['00', '.']
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
