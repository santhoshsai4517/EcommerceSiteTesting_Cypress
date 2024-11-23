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
		const orders = new ordersPage();
		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		cy.wait(1000);
		prod.getOrdersButton().click();
		orders.getOrders().eq(0).find('.btn-primary').click();
	});

	it('When user clicks on home button home page is displayed', () => {
		const prod = new productsPage();

		prod.getHomeButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user clicks on orders button orders page is displayed', () => {
		const prod = new productsPage();

		prod.getOrdersButton().click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl + '/dashboard/myorders'
		);
	});

	it('When user clicks on logo home page is displayed', () => {
		const prod = new productsPage();

		prod.getLogo().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user clicks on cart button cart page is displayed', () => {
		const prod = new productsPage();

		prod.getCartButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/cart');
	});

	it('When user clicks on sign-out login page is displayed', () => {
		const prod = new productsPage();
		const login = new loginPage();

		prod.getSignOutButton().click();
		login.getSignOutMessage().should(
			'contain.text',
			'Logout Successfully'
		);
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/login');
	});
});
