import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('semestre {string} é selecionado no filtro', (semester) => {
    cy.get('[data-cy="semesterFilter"]').should('exist');
    cy.get('[data-cy="semesterFilter"]').select(parseInt(semester));
    cy.get('[data-cy="semesterFilter"]').should('have.value', parseInt(semester));
});

When('busca por cadeira com {string}', (searchQuery) => {
    cy.visit(`/search/${searchQuery}`)
});

// Then('é possível ver no carrossel:', (datatable) => {
//     cy.log("0")
//     cy.get('[data-cy="RecentReviewCarouselCards"]').should('exist');
//     cy.log("1")
//     cy.get('[data-cy="RecentReviewCarousel"]').find('RecentReviewCarouselCards').should('have.length', 10);
//     cy.log("2")
//     // let index = 0;
    
//     datatable.hashes().forEach(row => {
//         cy.log("3")
//         const { username, discipline, comment } = row;
//         const cardSelector = `.styles.carousel .card:contains("${username}")`;

//         if (cy.get('.carousel').find('.card').contains(username).length <= 10) {
//             cy.get('.carousel').find(cardSelector).should('contain', discipline);
//             cy.get('.carousel').find(cardSelector).should('contain', comment);
//         }
//     });
// });