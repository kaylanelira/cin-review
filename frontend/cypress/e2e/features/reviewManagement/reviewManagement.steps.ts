import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

before(() => {
  // create user
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

  //create course
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/discipline/add',
    body: {
      name: 'Engenharia de Software e Sistemas',
      code: 'ess',
      department: 'Computer Science',
      semester: 6,
      professor: 'Breno Miranda',
      description: 'Engenharia de Software e Sistemas é uma disciplina que aborda os princípios, técnicas e práticas relacionadas ao desenvolvimento de software e sistemas de grande escala. Ela envolve o estudo de métodos de engenharia de software, gerenciamento de projetos, design de sistemas, entre outros aspectos.'
    },
    failOnStatusCode: false // Do not fail the test on non-2xx response
  }).then((response) => {
    if (response.status === 409) {
      // Discipline already exists, log a message and continue
      cy.log('Discipline already exists, skipping discipline creation');
    } else if (response.status !== 201) {
      // Handle other non-successful status codes if needed
      throw new Error(`Failed to create discipline. Status: ${response.status}`);
    }
  });
  

});

after(() => {
  // delete user
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:8000/user/delete?username=test?password=test',
    failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
  }).then((response) => {
    // Check if the response status code is either 200 or 404
    expect(response.status).to.be.oneOf([200, 404]);
  });
  // delete course
  cy.request({
    method: 'DELETE',
    url: 'http://localhost:8000/discipline/by_code/ess',
    failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
  }).then((response) => {
    // Check if the response status code is either 200 or 404
    expect(response.status).to.be.oneOf([200, 204, 404]);
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

Given('o usuário {string} possui um review cadastrado para a cadeira {string} com nota {string} e comentário {string}', (username, course, rating, comment) => {

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
      rating: rating,
      comment: comment
    }
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
});

Then('é possível ver a mensagem {string}', (message) => {
  cy.contains(message).should('exist');
});

Then('não é possível ver o campo {string}', (campoID) => {
  cy.get(`input[id="${campoID}"]`).should('not.exist');
});