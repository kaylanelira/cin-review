import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário com nome de usuário {string} existe', (username) => {
  const userData = {
    name: "Robert",
    username: "manhattan",
    email: "manhattan@gmail.com",
    password: "open",
    repeated_password: "open"
  };
  cy.request({
    method: 'POST',
    url: `http://localhost:8000/user/create_user`,
    failOnStatusCode: false,
    body: userData,
  }).then((response) => {
    expect(response.status).to.be.oneOf([201, 409]);
  })
});