import { mount } from 'cypress/vue'
import Input from '../Input.vue'
import '../style'

describe('<Input />', () => {
  it('input test', () => {
    mount(Input, {
      props: {
        modelValue: '123',
        showClear: true
      }
    })

    const $input = cy.get('input')
    $input.should('have.value', '123')

    cy.get('input').focus()
    cy.wait(500)
    cy.get('.ak-input_clear').click()
    cy.get('input').should('have.value', '')

    cy.get('input').type('a1234')
    cy.get('input').should('have.value', 'a1234')
  })
})
