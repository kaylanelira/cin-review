import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário {string} não possui um review cadastrado para a cadeira {string}', (username, course) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/review/delete?discipline=${course}&username=${username}`,
    failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
  }).then((response) => {
    // Check if the response status code is either 200 or 404
    expect(response.status).to.be.oneOf([200, 404]);
  });
});

Given('o usuário com username {string} e senha {string} está logado', (username, password) => {
  cy.visit('/login');
  cy.get('input[id="username"]').type(username);
  cy.get('input[id="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Given('o usuário {string} está na página {string}', (username, page) => {
  cy.visit(page);
});


When('o usuário clica em {string}', (buttonText) => {
  cy.contains(buttonText).click();
});

When('o usuário preenche o campo {string} com {string}', (fieldName, value) => {
  cy.get(`input[id="${fieldName}"], textarea[id="${fieldName}"]`).type(value);
});

Then('o usuário {string} ainda está na página {string}', (username, page) => {
  cy.url().should('include', page);
});

Then('é possível ver o review com nota {string} e comentário {string}', (rating, comment) => {
  cy.contains(`${rating}`).should('exist');
  cy.contains(`${comment}`).should('exist');
});
