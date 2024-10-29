/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login: (email?: string, password?: string) => void;
      logout: () => void;
    }
  }
}

//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email = 'test@example.com', password = 'password') => {
  cy.session([email, password], () => {
    cy.visit('/sign-in');
    cy.get('[data-testid=email-input]').type(email);
    cy.get('[data-testid=password-input]').type(password);
    cy.get('[data-testid=submit-button]').click();
    cy.url().should('not.include', '/sign-in');
  });
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid=user-menu-button]').click();
  cy.get('[data-testid=sign-out-button]').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export {};