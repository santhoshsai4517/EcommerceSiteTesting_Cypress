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
}

export default loginPage;
