/** @format */
import loginPage from '../../pages/loginPage';
import registerPage from '../../pages/registerPage';
import forgotPasswordPage from '../../pages/forgotPasswordPage';
import productsPage from '../../pages/productsPage';

describe('Login Page functionality validation', () => {
	it('When landed on login page login text is displayed', () => {
		cy.visit('/');
		const login = new loginPage();
		login.getLoginText().should('contain.text', 'Log in');
	});

	it('When clicked on register button register page should be displayed', () => {
		cy.visit('/');
		const login = new loginPage();
		const register = new registerPage();
		login.getRegisterButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/register');
		register.getRegisterText().should('contain.text', 'Register');
	});

	it('When clicked on forgot password link forgot password page should be displayed', () => {
		cy.visit('/');
		const login = new loginPage();
		const forgotPassword = new forgotPasswordPage();
		login.getForgotPasswordLink().click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl + '/auth/password-new'
		);
		forgotPassword
			.getForgotPasswordText()
			.should('contain.text', 'Enter New Password');
	});

	it('When clicked on register lin register page should be displayed', () => {
		cy.visit('/');
		const login = new loginPage();
		const register = new registerPage();
		login.getRegisterLink().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/register');
		register.getRegisterText().should('contain.text', 'Register');
	});

	it('When provided correct login details and clicked on submit button products page should be displayed', () => {
		const login = new loginPage();
		const prodPage = new productsPage();
		cy.intercept('POST', '/api/ecom/auth/login', (req) => {
			expect(req.body.userEmail).to.equal(
				'santhoshsai4517@gmail.com'
			);
			expect(req.body.userPassword).to.equal('151Fa04124@4517');
		}).as('loginRequest');
		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		login.getSuccessToast()
			.should('contain.text', 'Login Successfully')
			.screenshot();
		cy.wait('@loginRequest').then((interception) => {
			const sessionId = interception.response.body.token;
			cy.log(`Session ID: ${sessionId}`);
		});
		prodPage.getLogoText().should('contain.text', 'Automation');
	});
});
