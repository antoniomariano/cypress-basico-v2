
    it('Testar a página de política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html') //abre url arquivo
        cy.contains('Talking About Testing').should('be.visible')
    })

    //lodash
    Cypress._.times(5, function() {
        // executa o N vezes
        it.only('Testar a página de política de privacidade de forma independente', function(){
            cy.visit('./src/privacy.html')
            cy.contains('Talking About Testing').should('be.visible')
        })
    })
    // it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    //     cy.get('.success')
    //       .should('not.be.visible')
    //       .invoke('show')
    //       .should('be.visible')
    //       .and('contain', 'Mensagem enviada com sucesso.')
    //       .invoke('hide')
    //       .should('not.be.visible')
    //     cy.get('.error')
    //       .should('not.be.visible')
    //       .invoke('show')
    //       .should('be.visible')
    //       .and('contain', 'Valide os campos obrigatórios!')
    //       .invoke('hide')
    //       .should('not.be.visible')
    //   }) 