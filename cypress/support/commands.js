/** @format */

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loginPage from '../pages/loginPage';
import registerPage from '../pages/registerPage';

Cypress.Commands.add('login', (email, password) => {
	const login = new loginPage();
	login.getEmailEditText().type(email);
	login.getPasswordEditText().type(password);
	login.getSubmitButton().click();
});

Cypress.Commands.add(
	'register',
	(
		fname,
		lname,
		email,
		phonenumber,
		occupation,
		gender,
		password,
		confirmPassword,
		check
	) => {
		const register = new registerPage();

		register.getFirstNameEditBox().type(fname);
		register.getLastNameEditBox().type(lname);
		register.getEmailEditBox().type(email);
		register.getMobileEditBox().type(phonenumber);
		register.getOccupationDropDown().select(occupation);
		register.getGenderRadioButton().check(gender);
		register.getPasswordEditBox().type(password);
		register.getConfirmPasswordEditBox().type(confirmPassword);
		if (check) register.getCheckBox().check();
		register.getRegisterButton().click();
	}
);
