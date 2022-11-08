import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { SwipeCell } from '@/SwipeCell'

describe('SwipeCell', () => {
  test('snapshot', () => {
    const wrapper = shallowMount(SwipeCell, {})

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('set buttons', () => {
    const wrapper = shallowMount(SwipeCell, {
      props: {
        buttons: [
          {
            text: 'Add',
            type: 'warning'
          },
          {
            text: 'Delete',
            type: 'danger'
          }
        ]
      }
    })

    const $buttons = wrapper.findAll('.ta-swipe-cell_button')

    expect($buttons[0].text()).toBe('Add')
    expect($buttons[1].text()).toBe('Delete')

    expect($buttons[0].classes()).toContain('type--warning')
    expect($buttons[1].classes()).toContain('type--danger')
  })
})
