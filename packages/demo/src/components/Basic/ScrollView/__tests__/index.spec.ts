import { shallowMount } from '@vue/test-utils'
import { ScrollView } from '@/ScrollView'

describe('ScrollView', () => {
  test('should render prop scrollY=true correctly', () => {
    const wrapper = shallowMount(ScrollView, {
      props: {
        scrollY: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
