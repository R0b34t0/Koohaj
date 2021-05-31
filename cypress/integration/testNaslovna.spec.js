describe('Naslovna stranica', () => {
    it('Test naslovne stranice', () => {
        // Otvara se poveznica
        cy.visit('localhost:8080')

        // Provjera postoji li Koohaj na vrhu 
        cy.contains('Koohaj!')

        // Provjera postoji li tipka Prijava
        cy.contains('Prijava')

        // Provjera postoji li funkcionalnost pretrage, ako postoji napraviti unos
        cy.get('#searchBar')
            .type('pizza')

        // Provjera postoji li tipka za pretragu, ako postoji kliknuti
        cy.get('#btnSearch')
            .click()

        // Provjera postoji li slika, ako postoji kliknuti i otvoriti jelo
        cy.get('.images').click()

        // Pauza od 1.5 sekundi do sljedece funkcionalnosti
        cy.wait(1500)

        // Provjera postoji li tipka za nasumicno, ako postoji kliknuti ju
        cy.get('.btnRandom').click()

    })
})