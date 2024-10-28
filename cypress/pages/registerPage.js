/** @format */

class registerPage {
	getRegisterText() {
		return cy.get('.login-title');
	}

	getLoginLink() {
		return cy.get('.text-reset');
	}

	getFirstNameEditBox() {
		return cy.get('#firstName');
	}

	getLastNameEditBox() {
		return cy.get('#lastName');
	}

	getEmailEditBox() {
		return cy.get('#userEmail');
	}

	getMobileEditBox() {
		return cy.get('#userMobile');
	}

	getOccupationDropDown() {
		return cy.get('select[formcontrolname="occupation"]');
	}

	getGenderRadioButton() {
		return cy.get('input[formcontrolname="gender"]');
	}

	getPasswordEditBox() {
		return cy.get('#userPassword');
	}

	getConfirmPasswordEditBox() {
		return cy.get('#confirmPassword');
	}

	getCheckBox() {
		return cy.get('input[type="checkbox"]');
	}

	getRegisterButton() {
		return cy.get('#login');
	}

	getSuccessMessage() {
		return cy.get('.headcolor');
	}

	getSuccessToast() {
		return cy.get('.ng-trigger');
	}

	getLoginButton() {
		return cy.get('.btn');
	}

	getInvalidEmail() {
		return cy.get('.invalid-feedback > div');
	}

	getPasswordMismatchError() {
		return cy.get('.invalid-feedback > div');
	}

	getUserExistsError() {
		return cy.get(
			'div[aria-label="User already exisits with this Email Id!"]'
		);
	}

	getPhoneNumberError() {
		return cy.get('.invalid-feedback > div');
	}

	getErrorToast() {
		return cy.get('div[role="alert"]');
	}

	getEmptyFirstnameError() {
		return cy.get(
			':nth-child(1) > .form-group > .invalid-feedback > div'
		);
	}

	getEmptyEmailError() {
		return cy.get(
			':nth-child(2) > :nth-child(1) > .invalid-feedback > div'
		);
	}

	getEmptyMobileError() {
		return cy.get(
			':nth-child(2) > :nth-child(2) > .invalid-feedback > div'
		);
	}

	getEmptyPasswordError() {
		return cy.get(
			':nth-child(4) > :nth-child(1) > .invalid-feedback > div'
		);
	}

	getEmptyConfirmPasswordError() {
		return cy.get(
			':nth-child(4) > :nth-child(2) > .invalid-feedback > div'
		);
	}

	getEmptyCheckboxError() {
		return cy.get(
			'[style="width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #dc3545;"] > div'
		);
	}
}

export default registerPage;
