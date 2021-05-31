describe('Testiranje funkcionalnosti unosa, pregleda unosa i brisanja', () => {
    it('Second test', () => {
        cy.visit('localhost:8080/#/unos')

        cy.url().should('include', '/unos')

        cy.contains('Unos').click()

        cy.get('.nazivJela')
            .type('lazanje')
            .should('have.value', 'lazanje')

        cy.get('.nazivOpis')
            .type('Unos opisa kuhanja')

        cy.get('.nazivSastojak')
            .type('Sastojak')

        cy.pause()

        cy.get('.buttonUnos')
            .click()

        cy.wait(1200)

        cy.contains('Pregled svih unosa')
            .click()

        cy.wait(500)

        cy.contains('lazanje').get('.deleteBtn').click()
    })
})