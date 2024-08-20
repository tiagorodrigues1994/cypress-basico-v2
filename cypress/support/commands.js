Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('tiago');
    cy.get('#lastName').type('medeiros');
    cy.get('#email').type('tiago123@gmail.com');
    cy.get('#open-text-area').type('teste'); 
    cy.get('button[type="submit"]').click();
    
})