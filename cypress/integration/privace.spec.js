
    it('Testar a página de política de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
    // it.only('Testa a página de política de privacidade de forma independente', function(){
    //     //abrindo em outra aba do browser
    //     cy.get('#privacy a')
    //         .invoke('removeAttr', 'target')
    //         .click()
            
    //     cy.contains('Talking About Testing').should('be.visible')
    // })