/** @format */

import forgotPasswordPage from '../../pages/forgotPasswordPage';
import loginPage from '../../pages/loginPage';

describe('Forgot password page error handling validation', () => {
	it('When user submits empty form errors are displayed', () => {
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();

		cy.visit('/');
		login.getForgotPasswordLink().click();
		forgotPassword.getSubmitButton().click();
		forgotPassword
			.getEmailErrorText()
			.should('contain.text', '*Email is required');
		forgotPassword
			.getPasswordErrorText()
			.should('contain.text', '*Password is required');
		forgotPassword
			.getconfirmPasswordErrorText()
			.should('contain.text', '*Confirm Password is required');
	});

	it('When user enter invalid email and submits the form error is displayed', () => {
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();

		cy.visit('/');
		login.getForgotPasswordLink().click();
		forgotPassword.getEmailEditBox().type('cregrtn');
		forgotPassword.getPasswordEditBox().type('123');
		forgotPassword.getConfirmPasswordEditBox().type('123');
		forgotPassword.getSubmitButton().click();
		forgotPassword
			.getEmailErrorText()
			.should('contain.text', '*Enter Valid Email');
	});

	it('When user enters a mail that is not registered error is displayed', () => {
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();

		cy.visit('/');

		cy.intercept('POST', '/api/ecom/auth/new-password', (req) => {}).as(
			'APICall'
		);

		login.getForgotPasswordLink().click();
		forgotPassword.getEmailEditBox().type('testuser@exampde2fle.com');
		forgotPassword.getPasswordEditBox().type('123');
		forgotPassword.getConfirmPasswordEditBox().type('123');
		forgotPassword.getSubmitButton().click();

		cy.wait('@APICall').then((res) => {
			expect(res.response.statusCode).to.eq(404);
			expect(res.response.body.message).to.eq('User Not found.');
			forgotPassword
				.getErrorToast()
				.should('contain.text', 'User Not found.');
		});
	});

	it('When user enters different password in the form error is displayed', () => {
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();

		cy.visit('/');
		login.getForgotPasswordLink().click();
		forgotPassword.getEmailEditBox().type('testuser@exampde2fle.com');
		forgotPassword.getPasswordEditBox().type('123');
		forgotPassword.getConfirmPasswordEditBox().type('456');
		forgotPassword.getSubmitButton().click();
		forgotPassword
			.getMismatchErrorText()
			.should(
				'contain.text',
				'Password and Confirm Password must match with each other.'
			);
	});

	it('When user enters all the details and submits the form and api is failed', () => {
		const forgotPassword = new forgotPasswordPage();
		const login = new loginPage();
		cy.visit('/');

		cy.intercept('POST', '/api/ecom/auth/new-password', {
			statusCode: 500,
		}).as('loginRequest');

		login.getForgotPasswordLink().click();
		forgotPassword.getEmailEditBox().type('s1234@gmail.com');
		forgotPassword.getPasswordEditBox().type('P@ssw0rd');
		forgotPassword.getConfirmPasswordEditBox().type('P@ssw0rd');
		forgotPassword.getSubmitButton().click();
		cy.wait('@loginRequest').then((interception) => {
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/auth/password-new'
			);
		});
	});

	it('When user fills correct details and api request is changed', () => {
		const forgotPassword = new forgotPasswordPage();
		const login = new loginPage();
		cy.visit('/');

		cy.intercept('POST', '/api/ecom/auth/new-password', (req) => {
			req.body.userEmail = '123456';
		}).as('loginRequest');

		login.getForgotPasswordLink().click();
		forgotPassword.getEmailEditBox().type('s1234@gmail.com');
		forgotPassword.getPasswordEditBox().type('P@ssw0rd');
		forgotPassword.getConfirmPasswordEditBox().type('P@ssw0rd');
		forgotPassword.getSubmitButton().click();
		cy.wait('@loginRequest').then((res) => {
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/auth/password-new'
			);
			expect(res.response.statusCode).to.eq(404);
			expect(res.response.body.message).to.eq('User Not found.');
			forgotPassword
				.getErrorToast()
				.should('contain.text', 'User Not found.');
		});
	});
});
