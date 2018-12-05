describe('Login Page', () => {


    it('should go to the register page and try to register', () => {
        cy.visit('http://localhost:4200/register');
        cy.get('[data-test=email]').type('thibaut@test.be');
        cy.get('[data-test=password]').type('testtesttest');
        cy.get('[data-test=passwordControl').type('testtesttest')
        cy.get('[data-test=registerBtn]').click();
 
    });

   it('should go to the login page and try to login', () => {
       cy.visit('http://localhost:4200/login');
       cy.get('[data-test=email]').type('thibaut@test.be');
       cy.get('[data-test=password]').type('testtesttest');
       cy.get('[data-test=loginBtn]').click();

   });

//    it('should show an error when the login is invalid', () => {
//        cy.visit('');

//        cy.get('[data-test=username]').type('notKwinten');
//        cy.get('[data-test=password]').type('invalid');
//        cy.get('[data-test=loginBtn]').click();

//        cy.contains('Error 401 while trying to login user notKwinten');
//    });

//    it('should not be possible to click the login button when the username is not filled in ', () => {
//        cy.visit('');

//        cy.get('[data-test=username]').type('notKwinten');

//        cy.get('[data-test=loginBtn]').should('be.disabled');
//    });

//     it('should not be possible to click the login button when the password is not filled in ', () => {
//         cy.visit('');

//         cy.get('[data-test=password]').type('invalid');

//         cy.get('[data-test=loginBtn]').should('be.disabled');
//     });
});
