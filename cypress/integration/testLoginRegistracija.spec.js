describe('Testiranje funkcionalnosti prijave i registracije', () => {
    it('Test prijave i registracije', () => {
        cy.visit('localhost:8080/#/')


        cy.contains('Prijava').click()

        cy.get('[type=email]').type('mail@mail.com')
        cy.get('[type=password]').type('lozinka')
        cy.get('.loginBtn').click()

        cy.wait(200)

        cy.contains('Odjava').click()

        cy.wait(200)

        cy.contains('Prijava').click()

        cy.get('h4').click()

        cy.get('[type=email]').type('mailTest@mail.com')
        cy.get('.lozinka1').type('lozinkatest')
        cy.get('.lozinka2').type('lozinkatest')
        cy.get('.registerBtn').click()

    })
})