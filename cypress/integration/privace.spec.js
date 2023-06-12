
    it('Testar a página de política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html') //abre url arquivo
        cy.contains('Talking About Testing').should('be.visible')
    })

    //lodash
    Cypress._.times(5, function() {
        // executa o N vezes
        it('Testar a página de política de privacidade de forma independente', function(){
            cy.visit('./src/privacy.html')
            cy.contains('Talking About Testing').should('be.visible')
        })
    })
    