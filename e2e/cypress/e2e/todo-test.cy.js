beforeEach(() => {
  cy.visit('http://localhost:8080/')
})

describe('Todo app tests', () => {
  describe('State-related', () => {
    describe('should', () => {
      it('load with no initial tasks', () => {
        //arrange
        //act
        //assert
        cy.get('.todo-text').should('have.length', 0)
      })

      it('remember tasks, if any already there', () => {
        //arrange
        const todoItem = 'Ivan does some testing for remembering'
        cy.get('#todo-input').type(todoItem)
        cy.get('#todo-submit').click()

        //act
        cy.reload()

        //assert
        cy.get('.todo-text').should('have.length', 1)
        cy.get('.todo-text').should('have.text', todoItem)
      })
    })
  })

  describe('Action-related', () => {
    describe('should allow you to', () => {
      it('add new tasks', () => {
        //arrange
        const todoItem = 'Ivan does some testing for adding'

        //act
        cy.get('#todo-input').type(todoItem)
        cy.get('#todo-submit').click()

        //assert
        cy.get('.todo-text').should('have.length', 1)
        cy.get('.todo-text').should('have.text', todoItem)
      })

      it('delete tasks', () => {
        //arrange
        const todoItem = 'Ivan does some testing for adding'
        cy.get('#todo-input').type(todoItem)
        cy.get('#todo-submit').click()
        cy.get('.todo-text').should('have.length', 1)
        cy.get('.todo-text').should('have.text', todoItem)

        //act
        cy.get('.delete-button').click()

        //assert
        cy.get('.todo-text').should('have.length', 0)
      })

      it('remove all tasks', () => {
        //arrange
        const todoItem = 'Ivan does some testing'
        cy.get('#todo-input').type(todoItem)
        cy.get('#todo-submit').click()
        cy.get('.todo-text').should('have.text', todoItem)

        //act
        cy.get('#remove-all').click()

        //assert
        cy.get('.todo-text').should('have.length', 0)
      })

      it('reset tasks to default', () => {
        //arrange
        cy.get('.todo-text').should('have.length', 0)

        //act
        cy.get('#reset-default').click()

        //assert
        cy.get('.todo-text').should('have.length', 3)
      })
    })
  })
})