import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário {string} não está cadastrado', (username) => {
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:8000/user/delete_user/test?password=test',
    failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
  }).then((response) => {
    // Check if the response status code is either 200 or 404
    expect(response.status).to.be.oneOf([200, 404]);
  });
});