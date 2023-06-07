
    it('Testar a página de política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html') //abre url arquivo
        cy.contains('Talking About Testing').should('be.visible')
    })
    // it.only('Testa a página da política de privacidade de forma independente', function(){
    //     //abrindo em outra aba do browser
    //     cy.get('#privacy a')
    //         .invoke('removeAttr', 'target')
    //         .click()
    //     cy.contains('Talking About Testing').should('be.visible')
    // })

    // Cypress._.times(5, function() {
    //     it('Testar a página de política de privacidade de forma independente', function(){
    //         cy.visit('./src/privacy.html')
    //         cy.contains('Talking About Testing').should('be.visible')
    //     })
    // })
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