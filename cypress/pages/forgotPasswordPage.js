/** @format */

class forgotPasswordPage {
	getForgotPasswordText() {
		return cy.get('h3');
	}

	getEmailEditBox() {
		return cy.get('input[type="email"]');
	}

	getPasswordEditBox() {
		return cy.get('#userPassword');
	}

	getConfirmPasswordEditBox() {
		return cy.get('#confirmPassword');
	}

	getSubmitButton() {
		return cy.get('.btn');
	}

	getLoginLink() {
		return cy.get('a[href*="login"]');
	}

	getRegisterLink() {
		return cy.get('a[href*="register"]');
	}

	getEmailErrorText() {
		return cy.get('.mt-2 > .invalid-feedback > div');
	}

	getPasswordErrorText() {
		return cy.get(':nth-child(2) > .invalid-feedback > div');
	}

	getconfirmPasswordErrorText() {
		return cy.get(':nth-child(3) > .invalid-feedback > div');
	}

	getErrorToast() {
		return cy.get('div[role="alert"]');
	}

	getMismatchErrorText() {
		return cy.get('.invalid-feedback > div');
	}
}

export default forgotPasswordPage;
