/// <reference types="Cypress" />

declare namespace Cypress{
    interface Chainable {
        login(): void;
        logout(): void;
        register(username, password): void;
        prepTest(): void;
    }
}

describe('Login Page', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.register('admin@gmail.com','test');
        cy.logout();
    });


    it('should go to the login page', () => {
        cy.visit('');
    })
});

