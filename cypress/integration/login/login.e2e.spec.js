describe('Login Page', () => {

   it('should go to the login page and try to login', () => {
       cy.visit('http://localhost:4200/login');
       cy.get('[data-test=email]').type('test@test.be');
       cy.get('[data-test=password]').type('testtesttest');
       cy.get('[data-test=loginBtn]').click();

   });

});