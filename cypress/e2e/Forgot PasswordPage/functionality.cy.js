/** @format */

import forgotPasswordPage from '../../pages/forgotPasswordPage';
import loginPage from '../../pages/loginPage';
import registerPage from '../../pages/registerPage';

describe('Forgot Password page functionality validation', () => {
	it('When user clicks on login link login page is displayed', () => {
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();
		cy.visit('/');
		login.getForgotPasswordLink().click();
		forgotPassword.getLoginLink().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/login');
		login.getLoginText().should('contain.text', 'Log in');
	});

	it('When user clicks on register link register page is displayed', () => {
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();
		const register = new registerPage();
		cy.visit('/');
		login.getForgotPasswordLink().click();
		forgotPassword.getRegisterLink().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/register');
		register.getRegisterText().should('contain.text', 'Register');
	});

	it('When user enters all the details and submits the form login page is displayed', () => {
		const forgotPassword = new forgotPasswordPage();
		const login = new loginPage();
		cy.visit('/');

		cy.intercept('POST', '/api/ecom/auth/new-password', (req) => {
			expect(req.body.userEmail).to.equal('s1234@gmail.com');
			expect(req.body.userPassword).to.equal('123');
		}).as('loginRequest');

		login.getForgotPasswordLink().click();
		forgotPassword.getEmailEditBox().type('s1234@gmail.com');
		forgotPassword.getPasswordEditBox().type('123');
		forgotPassword.getConfirmPasswordEditBox().type('123');
		forgotPassword.getSubmitButton().click();
		cy.wait('@loginRequest').then((interception) => {
			expect(interception.response.body.message).to.eq(
				'Password Changed Successfully'
			);
		});
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/login');
		login.getLoginText().should('contain.text', 'Log in');
		login.getPasswordUpdatedMessage().should(
			'contain.text',
			'Password Changed Successfully'
		);
		cy.login('s1234@gmail.com', '123');
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});
});
