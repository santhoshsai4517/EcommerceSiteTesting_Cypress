/** @format */

import loginPage from '../../pages/loginPage';
import registerPage from '../../pages/registerPage';

describe('Register page error handling validations', () => {
	it('When user enters invalid email and submits error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'dfgr';

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
		register
			.getInvalidEmail()
			.should('contain.text', '*Enter Valid Email');
	});

	it('When user enters mismatch password and submits error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'san@gmail.com';

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
			'151Fa04124@4ee56',
			true
		);
		register
			.getPasswordMismatchError()
			.should(
				'contain.text',
				'Password and Confirm Password must match with each other.'
			);
	});

	it('When user enters registered email and submits error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'santhoshsai4517@gmail.com';
		cy.visit('/');
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
			register
				.getErrorToast()
				.should(
					'contain.text',
					'User already exisits with this Email Id!'
				);
			expect(interception.response.statusCode).to.equal(400);
			expect(interception.response.body.message).to.equal(
				'User already exisits with this Email Id!'
			);
		});
	});

	it('When user enters phone number greater than 10 digits error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'san@gmail.com';

		cy.visit('/');
		login.getRegisterButton().click();
		cy.register(
			'santhosh',
			'sai',
			email,
			'123456789011',
			'Engineer',
			'Male',
			'151Fa04124@456',
			'151Fa04124@456',
			true
		);
		register
			.getPhoneNumberError()
			.should('contain.text', '*Phone Number must be 10 digit');
	});

	it('When user enters phone number with chars error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'san@gmail.com';

		cy.visit('/');
		login.getRegisterButton().click();
		cy.register(
			'santhosh',
			'sai',
			email,
			'123456w011',
			'Engineer',
			'Male',
			'151Fa04124@456',
			'151Fa04124@456',
			true
		);
		register
			.getPhoneNumberError()
			.should('contain.text', '*only numbers is allowed');
	});

	it('When user enters phone number with chars and greater than 10 error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'san@gmail.com';

		cy.visit('/');
		login.getRegisterButton().click();
		cy.register(
			'santhosh',
			'sai',
			email,
			'123456ww011',
			'Engineer',
			'Male',
			'151Fa04124@456',
			'151Fa04124@456',
			true
		);
		register
			.getPhoneNumberError()
			.should('contain.text', '*only numbers is allowed');
		register
			.getPhoneNumberError()
			.should('contain.text', '*Phone Number must be 10 digit');
	});

	it('When user enters password less than 8 chars error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'san@gmail.com';

		cy.intercept('POST', '/api/ecom/auth/register', (req) => {
			expect(req.body.firstName).to.equal('santhosh');
			expect(req.body.lastName).to.equal('sai');
			expect(req.body.userEmail).to.equal(email);
			expect(req.body.userMobile).to.equal('1234567890');
			expect(req.body.userRole).to.equal('customer');
			expect(req.body.occupation).to.equal('Engineer');
			expect(req.body.gender).to.equal('Male');
			expect(req.body.userPassword).to.equal('123');
			expect(req.body.confirmPassword).to.equal('123');
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
			'123',
			'123',
			true
		);
		cy.wait('@registerRequest').then((interception) => {
			expect(interception.response.statusCode).to.equal(422);
			expect(interception.response.body.success).to.equal(false);
			expect(interception.response.body.error).to.equal(
				'Password must be 8 Character Long!'
			);
		});
		register
			.getErrorToast()
			.should('contain.text', 'Password must be 8 Character Long!');
	});

	it('When user enters password without chars error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'san@gmail.com';

		cy.intercept('POST', '/api/ecom/auth/register', (req) => {
			expect(req.body.firstName).to.equal('santhosh');
			expect(req.body.lastName).to.equal('sai');
			expect(req.body.userEmail).to.equal(email);
			expect(req.body.userMobile).to.equal('1234567890');
			expect(req.body.userRole).to.equal('customer');
			expect(req.body.occupation).to.equal('Engineer');
			expect(req.body.gender).to.equal('Male');
			expect(req.body.userPassword).to.equal('12345678');
			expect(req.body.confirmPassword).to.equal('12345678');
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
			'12345678',
			'12345678',
			true
		);
		cy.wait('@registerRequest').then((interception) => {
			expect(interception.response.statusCode).to.equal(422);
			expect(interception.response.body.success).to.equal(false);
			expect(interception.response.body.error).to.equal(
				'Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small'
			);
		});
		register
			.getErrorToast()
			.should(
				'contain.text',
				'Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small'
			);
	});

	it('When user submits empty error occurs', () => {
		const login = new loginPage();
		const register = new registerPage();

		cy.visit('/');
		login.getRegisterButton().click();

		register.getRegisterButton().click();

		register
			.getEmptyFirstnameError()
			.should('contain.text', '*First Name is required');
		register
			.getEmptyEmailError()
			.should('contain.text', '*Email is required');
		register
			.getEmptyMobileError()
			.should('contain.text', '*Phone Number is required');
		register
			.getEmptyPasswordError()
			.should('contain.text', '*Password is required');
		register
			.getEmptyConfirmPasswordError()
			.should('contain.text', 'Confirm Password is required');
		register
			.getEmptyCheckboxError()
			.should('contain.text', '*Please check above checkbox');
	});

	it('When user submits form and api is failed', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'sdwe@gmail.com';

		cy.visit('/');
		login.getRegisterButton().click();

		cy.intercept('POST', '/api/ecom/auth/register', {
			statusCode: 500, // Unauthorized status code
			body: { error: 'Unknown error occured' }, // Custom error message
		}).as('failedCall');

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

		cy.wait('@failedCall').then((interception) => {
			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/auth/register'
			);
			expect(interception.response.statusCode).to.equal(500);
			// expect(interception.response.body).to.equal(
			// 	'{ error: Unknown error occured }'
			// );
		});
	});

	it('When user submits form and api request is modified', () => {
		const login = new loginPage();
		const register = new registerPage();
		const email = 'sdwe@gmail.com';

		cy.visit('/');
		login.getRegisterButton().click();

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
			req.body.userEmail = 'santhoshsai4517@gmail.com';
		}).as('modifiedRequest');

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

		cy.wait('@modifiedRequest').then((interception) => {
			register
				.getErrorToast()
				.should(
					'contain.text',
					'User already exisits with this Email Id!'
				);
			expect(interception.response.statusCode).to.equal(400);
			expect(interception.response.body.message).to.equal(
				'User already exisits with this Email Id!'
			);
		});
	});
});
