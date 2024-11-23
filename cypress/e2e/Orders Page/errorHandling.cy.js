/** @format */
import cartPage from '../../pages/cartPage';
import checkoutPage from '../../pages/checkoutPage';
import loginPage from '../../pages/loginPage';
import orderConfirmationPage from '../../pages/orderConfirmationPage';
import orderPage from '../../pages/orderPage';
import ordersPage from '../../pages/ordersPage';

import productsPage from '../../pages/productsPage';
describe('Order confirmation page validations', () => {
	const prod = new productsPage();
	const cart = new cartPage();
	const checkout = new checkoutPage();
	const confirmation = new orderConfirmationPage();

	const products = [
		'ZARA COAT 3',
		'qwerty',
		'ADIDAS ORIGINAL',
		'IPHONE 13 PRO',
	];
	let prices = {
		zara: 31500,
		adidas: 31500,
		iphone: 231500,
		qwerty: 11500,
	};
	let productId = {
		zara: '6581ca399fd99c85e8ee7f45',
		adidas: '6581ca979fd99c85e8ee7faf',
		iphone: '6581cade9fd99c85e8ee7ff5',
		qwerty: '6701364cae2afd4c0b90113c',
	};
	let orderIds = [];

	beforeEach(() => {
		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');

		prod.getOrdersButton().click();
	});

	it('When user lands on orders page and orders api is down', () => {
		const orders = new ordersPage();

		cy.intercept('GET', '**/get-orders-for-customer/*', {
			statusCode: 404, // Unauthorized status code
			body: { error: 'Unknown error occured', count: 0 }, // Custom error message
		}).as('failedCall');

		prod.getCartButton().click();
		prod.getOrdersButton().click();

		cy.wait('@failedCall').then((interception) => {
			orders.getUnknownErrorToast().should(
				'contain.text',
				'No Product in Your Cart'
			);
			orders.getNoProductsText().should(
				'have.text',
				' Loading.... '
			);
		});
	});

	it('When clicks on delete button and delete API is down', () => {
		const orders = new ordersPage();

		// Intercept DELETE request with a failure response
		cy.intercept('DELETE', '**/delete-order/*', {
			statusCode: 404, // Simulating server error
			body: { error: 'Unknown error occurred' }, // Custom error message
		}).as('failedCall');

		// Get the initial count of orders
		orders.getOrders().then(($orders) => {
			const initialCount = $orders.length;

			// Trigger the delete action
			orders.getOrders().eq(0).find('.btn-danger').click();

			// Wait for the DELETE request to complete
			cy.wait('@failedCall').then((interception) => {
				orders.getOrders().should('have.length', initialCount);
			});
		});
	});

	it('When user clicks on view button and view api is down', () => {
		const orders = new ordersPage();
		const order = new orderPage();

		cy.intercept('GET', '**/get-orders-details*', {
			statusCode: 404, // Unauthorized status code
			body: { error: 'Unknown error occured' }, // Custom error message
		}).as('failedCall');

		orders.getOrders().eq(0).find('.btn-primary').click();

		cy.wait('@failedCall').then((interception) => {
			cy.url().should('include', 'order-details');
			order.getErrorText().should(
				'contain.text',
				'You are not authorize to view this order'
			);
		});
	});
});
