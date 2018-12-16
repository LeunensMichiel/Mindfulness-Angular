describe('Register Page', () => {


    it('should go to the register page and try to register', () => {
        cy.visit('http://localhost:4200/register');
        cy.get('[data-test=email]').type('test@test.be');
        cy.get('[data-test=voornaam]').type('test');
        cy.get('[data-test=achternaam]').type('test');
        cy.get('[data-test=password]').type('testtesttest');
        cy.get('[data-test=passwordConfirm').type('testtesttest')
        cy.get('[data-test=registerBtn]').click();
 
    });
});