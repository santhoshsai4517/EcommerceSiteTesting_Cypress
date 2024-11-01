/** @format */

import loginPage from '../../pages/loginPage';
import registerPage from '../../pages/registerPage';
import productsPage from '../../pages/productsPage';

describe('Register Page functionality validation', () => {
	it('When landed on register and clicked on login link login page is displayed', () => {
		const login = new loginPage();
		const register = new registerPage();

		cy.visit('/');
		login.getRegisterButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/register');
		register.getRegisterText().should('contain.text', 'Register');
		register.getLoginLink().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/login');
		login.getLoginText().should('contain.text', 'Log in');
	});

	it('When user provides all valid details and clicks on register button user is registered', () => {
		const login = new loginPage();
		const reg = new registerPage();
		const prod = new productsPage();

		const email = 'wegggge1dfgfs@gmail.com';

		cy.intercept('POST', '/api/ecom/auth/register', (req) => {
			expect(req.body.firstName).to.equal('santhosh');
			expect(req.body.lastName).to.equal('sai');
			expect(req.body.userEmail).to.equal(email);
			expect(req.body.userMobile).to.equal('1234567890');
			expect(req.body.userRole).to.equal('customer');
			expect(req.body.occupation).to.equal('Engineer');
			expect(req.body.gender).to.equal('Male');
			expect(req.body.userPassword).to.equal('151Fa04124@456');
			expect(req.body.confirmPassword).to.equal('151Fa04124@456');
			expect(req.body.required).to.equal(true);
		}).as('registerRequest');

		cy.visit('/');
		login.getRegisterButton().click();

		cy.register(
			'santhosh',
			'sai',
			email,
			'1234567890',
			'Engineer',
			'Male',
			'151Fa04124@456',
			'151Fa04124@456',
			true
		);

		cy.wait('@registerRequest').then((interception) => {
			expect(interception.response.statusCode).to.equal(200);
			expect(interception.response.body.message).to.equal(
				'Registered Successfully'
			);
			reg.getSuccessToast().should(
				'contain.text',
				'Registered Successfully'
			);
			reg.getSuccessMessage().should(
				'contain.text',
				'Account Created Successfully'
			);
			reg.getLoginButton().click();
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/auth/login'
			);
			login.getLoginText().should('contain.text', 'Log in');
			cy.login(email, '151Fa04124@456');
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/dashboard/dash'
			);
			login.getSuccessToast().should(
				'contain.text',
				'Login Successfully'
			);
			prod.getLogoText().should('contain.text', 'Automation');
		});
	});
});
