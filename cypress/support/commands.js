// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('prepTest', () => {
    cy.login();
    cy.logout();
});

Cypress.Commands.add('login', () =>{
    const username = 'admin@gmail.com' + new Date().getTime();
    cy.register('admin@gmail.com', new Date().getTime(), 'test');
    cy.request({
        mehtod:'POST',
        url: 'http://localhost:4200/API/users/login/admin',
        body: {username, password: 'test'},
    }).then(res => localStorage.setItem('currentUser', res.body.token));
})

Cypress.Commands.add('register', (username, password) => {
    cy.request({
        method:'POST',
        url: 'http://localhost:4200/API/users/register/admin',
        body: {username, password},
    }).then(res => localStorage.setItem('currentUser', res.body.token));
});

Cypress.Commands.add('logout', () => {
    localStorage.removeItem('currentUser');
});