import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { Form, FormFooter } from '@/Form'

describe('Form', () => {
  test.concurrent('snapshot', () => {
    const wrapper = mount(Form, {
      slots: {
        footer: FormFooter
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
