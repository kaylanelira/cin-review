import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

Given('o usuário está na página {string}', (page) => {
  cy.visit(page);
});

Given('nao ha reviews', () => {
  cy.request({
      method: 'DELETE',
      url: 'http://localhost:8000/review/delete_all', 
      failOnStatusCode: false 
  }).then((response) => {
      expect(response.status).to.be.oneOf([200]);
  });
});

Given('nao ha disciplinas', () => {
  cy.request({
      method: 'GET',
      url: 'http://localhost:8000/discipline/get_all', 
      failOnStatusCode: false 
  }).then((response) => {
      expect(response.status).to.be.oneOf([200]);
      if (response.body.length === 0) {
          return;
      }
      response.body.forEach((discipline) => {
          cy.request({
              method: 'DELETE',
              url: `http://localhost:8000/discipline/by_code/${discipline.code}`, 
              failOnStatusCode: false 
          }).then((byCodeResponse) => {
              expect(byCodeResponse.status).to.be.oneOf([204]);
          });
      });
  });
});

Given('o ReviewService possui:', (datatable) => {
  cy.request({
      method: 'DELETE',
      url: 'http://localhost:8000/review/delete_all', 
      failOnStatusCode: false 
  }).then((response) => {
      expect(response.status).to.be.oneOf([200]);
  });
  datatable.hashes().forEach(row => {
      const payload = {}; 
      payload.username = row.username;
      payload.discipline = row.discipline;
      payload.rating = parseInt(row.rating);
      payload.comment = row.comment;
      payload.time = row.time;

      cy.request({
          method: 'POST',
          url: `http://localhost:8000/review/add`,
          body: payload,
          failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201]);
      });
  });
});

Given('o DisciplineService possui:', (datatable) => {
  cy.request({
      method: 'GET',
      url: 'http://localhost:8000/discipline/get_all', 
      failOnStatusCode: false 
  }).then((response) => {
      expect(response.status).to.be.oneOf([200]);
      if (response.body.length === 0) {
          return;
      }
      response.body.forEach((discipline) => {
          cy.request({
              method: 'DELETE',
              url: `http://localhost:8000/discipline/by_code/${discipline.code}`, 
              failOnStatusCode: false 
          }).then((byCodeResponse) => {
              expect(byCodeResponse.status).to.be.oneOf([204]);
          });
      });
  });
  datatable.hashes().forEach(row => {
      const payload = {};
      payload.name = row.name;
      payload.code = row.code;
      payload.department = row.department;
      payload.semester = parseInt(row.semester);
      payload.professor = row.professor;
      payload.description = row.description;

      cy.request({
          method: 'POST',
          url: `http://localhost:8000/discipline/add`,
          body: payload,
          failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201]);
      });
  });
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

Then("é possível ver {string}", (text) => {
  cy.contains(`${text}`).should("be.visible");
});

Then("nao e possivel ver o elemento com data-cy {string}", (string) => {
  cy.get(`[data-cy=${string}]`).should('not.exist');
});