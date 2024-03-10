import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

before(() => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/user/create_user',
    body: {
      name: 'test',
      surname: 'test',
      username: 'test',
      email: 'test@example.com',
      password: 'test',
      repeated_password: 'test',
      phone_number: '123456789',
      field_of_interest: 'Testing'
    },
    failOnStatusCode: false // Do not fail the test on non-2xx response
  }).then((response) => {
    if (response.status === 409) {
      // User already exists, log a message and continue
      cy.log('User already exists, skipping user creation');
    } else if (response.status !== 201) {
      // Handle other non-successful status codes if needed
      throw new Error(`Failed to create user. Status: ${response.status}`);
    }
  });
});

after(() => {
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:8000/user/delete?username=test?password=test',
    failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
  }).then((response) => {
    // Check if the response status code is either 200 or 404
    expect(response.status).to.be.oneOf([200, 404]);
  });
});

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

Then('é possível ver o review com nota {string} e comentário {string}', (rating, comment) => {
  cy.contains(`${rating}`).should('exist');
  cy.contains(`${comment}`).should('exist');
});

Given('o usuário {string} possui um review cadastrado para a cadeira {string} com nota {string} e comentário {string}', (username, course) => {

  // delete previous reviews
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/review/delete?discipline=${course}&username=${username}`,
    failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
  }).then((response) => {
    // Check if the response status code is either 200 or 404
    expect(response.status).to.be.oneOf([200, 404]);
  });

  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/review/add',
    body: {
      discipline: course,
      username: username,
      rating: 5,
      comment: 'Test comment'
    }
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});

Then('é possível ver a mensagem {string}', (message) => {
  cy.contains(message).should('exist');
});