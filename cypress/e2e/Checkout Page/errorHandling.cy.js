/** @format */

import checkoutPage from '../../pages/checkoutPage';
import cartPage from '../../pages/cartPage';
import loginPage from '../../pages/loginPage';
import productPage from '../../pages/productPage';
import productsPage from '../../pages/productsPage';

describe('Checkout page error handling', () => {
	const products = ['ZARA COAT 3', 'qwerty', 'ADIDAS ORIGINAL'];
	let prices = {
		zara: 31500,
		adidas: 31500,
		iphone: 231500,
		qwerty: 11500,
	};
	beforeEach(() => {
		const prod = new productsPage();
		const cart = new cartPage();

		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		cy.wait(1000);
		prod.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
			}
		});
		prod.getCartButton().click();
		cart.getCheckoutButton().click();
	});

	it('When user submits checkout without country details error occurs', () => {
		const checkout = new checkoutPage();
		checkout.getCheckoutButton().click();
		checkout
			.getEmptyCountryError()
			.should(
				'contain.text',
				'Please Enter Full Shipping Information'
			);
	});

	it('When user submits checkout with all details and api is failed error occurs', () => {
		const checkout = new checkoutPage();

		cy.intercept('POST', '/api/ecom/order/create-order', {
			statusCode: 404,
		}).as('failedRequest');

		checkout.getCountryField().type('ind');
		checkout.getCountriesList().each(($el, index, $list) => {
			if ($el.text().trim() === 'India') {
				cy.wrap($el).click();
			}
		});
		checkout.getCheckoutButton().click();

		cy.wait('@failedRequest').then((interception) => {
			cy.url().should(
				'include',
				Cypress.config().baseUrl + '/dashboard/order?prop='
			);
		});
	});
});
