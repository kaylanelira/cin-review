import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário está na página {string}', (page) => {
  cy.visit(page);
});

When('o usuário clica em {string}', (buttonText) => {
  cy.contains(buttonText).click();
});

When('o usuário preenche o campo {string} com {string}', (fieldName, value) => {
  cy.get(`input[id="${fieldName}"], textarea[id="${fieldName}"]`).type(value);
});

Then('o usuário ainda está na página {string}', (page) => {
  cy.url().should('include', page);
});

Then('o usuário vê a mensagem {string}', (message) => {
  cy.contains(message);
});