import { shallowMount } from '@vue/test-utils'
import { SwipeCell } from '@/SwipeCell'

describe('SwipeCell', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(SwipeCell, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render set buttons correctly', () => {
    const wrapper = shallowMount(SwipeCell, {
      props: {
        buttons: [
          {
            text: '加入收藏',
            type: 'warning'
          },
          {
            text: '删除',
            type: 'danger'
          }
        ]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
