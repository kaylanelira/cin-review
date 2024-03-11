import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('semestre {string} é selecionado no filtro', (semester) => {
    cy.get('[data-cy="semesterFilter"]').should('exist');
    cy.get('[data-cy="semesterFilter"]').select(parseInt(semester));
    cy.get('[data-cy="semesterFilter"]').should('have.value', parseInt(semester));
});

When('busca por cadeira com {string}', (searchQuery) => {
    cy.visit(`/search/${searchQuery}`)
});

Then('é possível ver no carrossel Em Alta:', (datatable) => {
    cy.get('[data-cy="topCoursesSection"]').should('exist');
    cy.get('[data-cy="topCoursesCard"]').should('exist');
    
    let totalCardSelectors = 0;

    datatable.hashes().forEach(row => {
        const { discipline } = row;
        const cardSelector = `[data-cy="topCoursesCard"]`;
    
        cy.get(cardSelector).each(card => {
            const cardText = card.text();
            if (cardText.includes(discipline)) {
                totalCardSelectors++;
            }
        })
    })
    cy.then(() => {
        cy.get('[data-cy="topCoursesCard"]').its('length').should('eq', totalCardSelectors);
    });
});

Then('é possível ver no carrossel Mais Recente:', (datatable) => {
    cy.get('[data-cy="recentReviewsSection"]').should('exist');
    cy.get('[data-cy="recentReviewsCard"]').should('exist');
    
    let totalCardSelectors = 0;

    datatable.hashes().forEach(row => {
        const { username, discipline, comment } = row;
        const cardSelector = `[data-cy="recentReviewsCard"]`;
    
        cy.get(cardSelector).each(card => {
            const cardText = card.text();
            if (cardText.includes(username) && cardText.includes(discipline) && cardText.includes(comment)) { 
                totalCardSelectors++;
            }
        })
    })
    cy.then(() => {
        cy.get('[data-cy="recentReviewsCard"]').its('length').should('eq', totalCardSelectors);
    });
});

Then('é possível ver as disciplinas:', (datatable) => {
    cy.get('[data-cy="coursesCard"]').should('exist');
    
    let totalCardSelectors = 0;

    datatable.hashes().forEach(row => {
        const { name, semester } = row;
        const cardSelector = `[data-cy="coursesCard"]`;
    
        cy.get(cardSelector).each(card => {
            const cardText = card.text();
            if (cardText.includes(name) && cardText.includes(semester)) {
                totalCardSelectors++;
            }
        })
    })
    cy.then(() => {
        cy.get('[data-cy="coursesCard"]').its('length').should('eq', totalCardSelectors);
    });
});