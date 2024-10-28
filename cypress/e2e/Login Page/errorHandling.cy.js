/** @format */
import loginPage from '../../pages/loginPage';
import registerPage from '../../pages/registerPage';

describe('Login page Error handling', () => {
	it('When login form is submitted with no details errors should be displayed', () => {
		cy.visit('/');
		const login = new loginPage();
		login.getSubmitButton().click();
		login.getEmailErrorMessage().should(
			'contain.text',
			'*Email is required'
		);
		login.getPasswordErrorMessage().should(
			'contain.text',
			'*Password is required'
		);
	});

	it('When invalid email is given error should be displayed', () => {
		const login = new loginPage();
		cy.visit('/');
		cy.login('13rfwv', '151Fa04124@4517');
		login.getEmailErrorMessage().should(
			'contain.text',
			'*Enter Valid Email'
		);
	});

	it('When wrong email and password are given error should be displayed', () => {
		const login = new loginPage();
		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '123456');
		login.getLoginErrorMessage().should(
			'contain.text',
			'Incorrect email or password.'
		);
	});

	it('When not registered email is given error should be displayed', () => {
		const login = new loginPage();
		cy.visit('/');
		cy.login('santhoshsai4517fgvwr@gmail.com', '151Fa04124@4517');
		login.getLoginErrorMessage().should(
			'contain.text',
			'Incorrect email or password.'
		);
	});

	it('When login api is failed error should be displayed', () => {
		cy.intercept('POST', '/api/ecom/auth/login', {
			statusCode: 500, // Unauthorized status code
			body: { error: 'Unknown error occured' }, // Custom error message
		}).as('failedLogin');
		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		cy.wait('@failedLogin').then((interception) => {
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/auth/login'
			);
		});
	});

	it('When login api payload is changed error should be displayed', () => {
		cy.intercept('POST', '/api/ecom/auth/login', (req) => {
			req.body.userEmail = 'santhoshsai4517@gmail.com';
			req.body.userPassword = '1234';
		}).as('loginRequest');
		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		cy.wait('@loginRequest').then((interception) => {
			const login = new loginPage();
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/auth/login'
			);
			login.getLoginErrorMessage().should(
				'contain.text',
				'Incorrect email or password.'
			);
		});
	});
});
