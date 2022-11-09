import { mount } from 'cypress/vue'
import Button from '../../Button/Button.vue'
import { showPicker } from '../index'
import '../style'

describe('<Picker />', () => {
  it('showPicker', () => {
    const options: number[] = []
    for (let i = 2000; i <= 2020; i++) {
      options.push(i)
    }
    const multiOptions = [options, ['spring', 'summer', 'autumn', 'winter']]

    const onClick = () => {
      showPicker({
        options: multiOptions
      })
    }
    mount(Button, {
      props: {
        onClick
      }
    })

    // 按钮点击，弹窗
    cy.get('.ta-button').click()

    // 默认值
    cy.wait(500)
    cy.get('.selected').should('have.text', '2000spring')

    // 滑动一下第一列
    cy.get('.ta-picker-view_list').first().scrollTo(0, 30)
    cy.wait(500)
    cy.get('.selected').should('have.text', '2001spring')
  })
})
