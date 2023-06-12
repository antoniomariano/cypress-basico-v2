/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function (){ //antes que ... executa algo...
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preencha os campos obrigatórios e envia o formulário', function() {
        const longText = 'Hoje é o aniversario do Thomas, parabéns filho, seja feliz.'
        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Mariano')
        cy.get('#email').type('lobinhomail@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 7}) //padrão do delay é 10s
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

    })
    it('exibe mensagem de erro ao submeter', function() {
        //Valide os campos obrigatórios!
        const longText = 'Hoje é o aniversario do Thomas, parabéns filho, seja feliz.'
        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Mariano')
        cy.get('#email').type('lobinhomailgmail.com')
        cy.get('#open-text-area').type(longText, {delay: 7}) //padrão do delay é 10s
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Campo telefonico continua vazio quando exibe valor numerico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')

    })
    it('Preenche todos os campos no form e limpa os dados', function(){
        //Valide os campos obrigatórios!
        cy.get('#firstName')
            .type('Antonio', {delay: 7})
            .should('have.value', 'Antonio')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Mariano', {delay: 7})
            .should('have.value', 'Mariano')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('lobinhomail@gmail.com', {delay: 7})
            .should('have.value', 'lobinhomail@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('21998893018', {delay: 10})
            .should('have.value', '21998893018')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('bom dia rio!', {delay: 7})
            .should('have.value', 'bom dia rio!')
            .clear()
            .should('have.value', '')
    })
    it('Exibir mensagem de erro', function(){
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o fomrulario com sucesso usanado comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('Selecionar um produto (Youtube)', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })
    it('Selecionar um produto (Mentoria)', function(){
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })
    it('Selecionar um produto (Blog) pelo índex', function(){
        cy.get('#product')
            .select(1) // valor do index
            .should('have.value', 'blog')
    })
    it('Selecionar um radio-button (feedback)', function(){
        cy.get('input[type="radio"][value="feedback"]') 
            .check() // marca o campo
            .should('have.value', 'feedback') // verifica se esta marcado
    })
    it('Marca cada tipo de atendimento no radio-button)', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3) // pega todos pelo index
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('Marcar todos o campos e desmarcar o ultimo campo checkbox ', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('Exibe mensagem de erro quando telefone é obrogatorio mas nao é preenchido', function(){
        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Mariano')
        cy.get('#email').type('lobinhomail@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("teste", {delay: 7}) //padrão do delay é 10s
        // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('Selecionar um arquivo da pasta fixture e fazer upload', function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json') //path do arquivo para buscar
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Selecionar um arquivo simulando um drag-and-drop', function(){
        // simulando arrastar o arquivo para o input
        cy.get('input[type="file"]') 
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) //path do arquivo para buscar
            .should(function($input){
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Selecione um arquivo utilizando uma fixture com alias', function(){
        // simulando arrastar o arquivo para o input
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]') 
            .selectFile('@sampleFile') // encurta a url do arquivo
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    
    it('Verifica se a politica de privacidade abre outro click', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página de política de privacidade removendo o target e clicando no link', function(){
        //abrindo em outra aba do browser
        cy.get('#privacy a')
            .invoke('removeAttr', 'target') //remove o atributo target
            .click()
        cy.contains('Talking About Testing').should('be.visible')//verifica se contem o texto na pagina
        
    })
    it('exibe a mensagem por 5 segundos', function(){
        cy.clock()//congela o relogio do navegador
        cy.get('#firstName').type('Antonio')
        cy.get('#lastName').type('Mariano')
        cy.get('#email').type('lobinhomail@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type("teste", {delay: 7})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS) // variavel setada do tempo
        cy.get('.error').should('not.be.visible')
    })
    //lodash
    Cypress._.times(5, function() {
        // executa o N vezes
        it('Testar a página de política de privacidade de forma independente', function(){
            cy.get('#firstName').type('Antonio')
            cy.get('#lastName').type('Mariano')
            cy.get('#email').type('lobinhomail@gmail.com')
            cy.get('#phone-checkbox').check()
        })
    })
    //invoke
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      }) 

      it.only('preencha a area de campo usando o comando .invoke', () => {
        const longText = Cypress._.repeat('1,2,3,4,5,6,7,8,9,0,<br>', 10)
        cy.get('#open-text-area').type(longText, {delay: 7})
            .invoke('val', longText)
            .should('have.value', longText)
      }) 


  })