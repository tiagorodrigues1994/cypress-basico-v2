// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />
// Esta linha é usada para fornecer suporte de autocompletar e IntelliSense no editor,
// garantindo que os tipos e métodos do Cypress sejam reconhecidos.

// Define um grupo de testes com o nome "Central de Atendimento ao Cliente TAT"

describe('Central de Atendimento ao Cliente TAT', function() {
  // SEMPRE devemos usar o beforeEach na aplicação para ele verificar primeiro o comando que está dentro desta função, no caso, ela vai conter o URL da aplicação:
  beforeEach(function(){
      cy.visit('./src/index.html');
      // Obtém o título da página atual e verifica se ele é igual ao valor esperado
  });

  // Define um teste específico dentro do grupo acima
  it('verifica o título da aplicação', function() {
      // Navega até o arquivo HTML especificado
      // Altere o caminho para o arquivo HTML conforme a estrutura do seu projeto
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
      // O método `cy.title()` obtém o título da página,
      // e `should('be.equal', 'Central de Atendimento ao Cliente TAT')` verifica se o título é exatamente o esperado.
  });

  it('preenche os campos obrigatórios e envia o formulário', function(){
      const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste';
      cy.get('#firstName').type('tiago');
      cy.get('#lastName').type('medeiros');
      cy.get('#email').type('tiago123@gmail.com');
      cy.get('#open-text-area').type(longText, { delay: 0 });
       // Envia o formulário clicando no botão com o texto 'Enviar'
  cy.contains('button', 'Enviar').click();
      cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('tiago');
      cy.get('#lastName').type('medeiros');
      cy.get('#email').type('tiago123@gmail,com'); // Erro na formatação do email
      cy.get('#open-text-area').type('teste'); 
       // Envia o formulário clicando no botão com o texto 'Enviar'
  cy.contains('button', 'Enviar').click();
      cy.get('.error').should('be.visible');
  });

  it('campo telefone consitnua vazio quando preenchido com valor numérico', function(){
      cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio', function(){
    cy.get('#firstName').type('tiago');
    cy.get('#lastName').type('medeiros');
    cy.get('#email').type('tiago123@gmail.com'); 

    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste'); // 
     // Envia o formulário clicando no botão com o texto 'Enviar'
  cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
    cy.get('#firstName')
    .type('tiago')
    .should('have.value', 'tiago')
    //pega o id firstname, digita tiago, e depois DEVE TER o Valor TIAGO, igual o que foi digitado, esse é o comando que foi dado.
    .clear()
    .should('have.value', '')
    //LIMPA depois VERIFICA SE ESTA VAZIO

    cy.get('#lastName')
    .type('medeiros')
    .should('have.value', 'medeiros')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('tiago123@gmail.com')
    .should('have.value', 'tiago123@gmail.com')
    .clear()
    .should('have.value', '')

    cy.get('#open-text-area')
    .type('teste')
    .should('have.value', 'teste')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('1234567')
    .should('have.value', '1234567')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    
  cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  })

  it('envia o formulário com sucesso usando  um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible');
  })

  it('seleciona um produto (Youtube) por seu texto', function(){
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('selecione um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('selecione um produto (Blog) por seu indice', function(){
    cy.get('#product')
    .select(1)
   .should('have.value', 'blog')
  })

  it('marcar o tipo de atendimento', function(){
    cy.get('input[type="radio"][value="feedback"]').check()
    .should('have.value', 'feedback')
   
  })

  it('marca cada tipo de atendimento', function(){
    // Seleciona todos os inputs do tipo rádio na página
    cy.get('input[type="radio"]')
      // Verifica se há exatamente 3 inputs do tipo rádio
      .should('have.length', 3)
      // Itera sobre cada input do tipo rádio
      .each(function($radio) {
        // Envolve o elemento jQuery em um objeto Cypress para aplicar comandos Cypress
        cy.wrap($radio)
          // Marca o input do tipo rádio
          .check()
          // Verifica se o input foi marcado corretamente
          .should('be.checked')
      })
    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function(){
      // Seleciona todos os checkboxes na página
      cy.get('input[type="checkbox"]')
        // Marca todos os checkboxes selecionados
        .check()
        .should('be.checked')
        // Seleciona o último checkbox da lista de checkboxes
        .last()
        // Desmarca o último checkbox
        .uncheck()
        // Verifica se o último checkbox desmarcado não está mais marcado
        .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input){
        console.log($input)
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('cerifica que a política de privacidade abre em outra aba sme a necessidade de um clique', function(){
      cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      //deve pegar o atributtoattr, que no caso é o target _blank e verificar se contem.
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link ', function(){
      cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

 
});
