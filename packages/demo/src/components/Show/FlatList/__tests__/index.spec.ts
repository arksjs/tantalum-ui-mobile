import { shallowMount } from '@vue/test-utils'
import { FlatList } from '@/FlatList'

const data: {
  id: number
  text: string
}[] = []

for (let i = 0; i < 10; i++) {
  data.push({
    id: i + 1,
    text: `Item ${i + 1}.`
  })
}

describe('FlatList', () => {
  test('should render default slot correctly', () => {
    const wrapper = shallowMount(FlatList, {
      props: {
        data
      },
      scopedSlots: {
        default: `<div>{{ props.item.text }}</div>`
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
