/** @format */

class loginPage {
	getLoginText() {
		return cy.get('.login-title');
	}

	getEmailEditText() {
		return cy.get('#userEmail');
	}

	getPasswordEditText() {
		return cy.get('#userPassword');
	}

	getSubmitButton() {
		return cy.get('#login');
	}

	getRegisterButton() {
		return cy.get('.btn1');
	}

	getRegisterLink() {
		return cy.get('.text-reset');
	}
	getForgotPasswordLink() {
		return cy.get('.forgot-password-link');
	}

	getSuccessToast() {
		return cy.get('.toast-title');
	}

	getEmailErrorMessage() {
		return cy.get(':nth-child(1) > .invalid-feedback > div');
	}

	getPasswordErrorMessage() {
		return cy.get('.mb-4 > .invalid-feedback > div');
	}

	getLoginErrorMessage() {
		return cy.get('.toast-message');
	}

	getPasswordUpdatedMessage() {
		return cy.get('.ng-trigger');
	}
}

export default loginPage;
