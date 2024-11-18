/** @format */
import cartPage from '../../pages/cartPage';
import checkoutPage from '../../pages/checkoutPage';
import loginPage from '../../pages/loginPage';
import orderConfirmationPage from '../../pages/orderConfirmationPage';
import productPage from '../../pages/productPage';
import productsPage from '../../pages/productsPage';
describe('Order confirmation page validations', () => {
	const prod = new productsPage();
	const cart = new cartPage();
	const checkout = new checkoutPage();
	const confirmation = new orderConfirmationPage();
	const path = require('path');

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
	let orderId = [];

	beforeEach(() => {
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

		checkout.getCountryField().type('ind');
		checkout.getCountriesList().each(($el, index, $list) => {
			if ($el.text().trim() === 'India') {
				cy.wrap($el).click();
			}
		});

		cy.intercept('POST', '/api/ecom/order/create-order', (req) => {
			expect(req.body.orders).to.have.length(products.length);
		}).as('createOrder');

		checkout.getCheckoutButton().click();
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

	it('When user clicks on orders link orders page is displayed', () => {
		confirmation.getOrdersLink().click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl + '/dashboard/myorders'
		);
	});

	it.only('When user lands on order confirmation page validate product details, order ids and product ids', () => {
		cy.url().should('include', productId['zara']);
		cy.url().should('include', productId['adidas']);
		cy.url().should('include', productId['iphone']);
		cy.url().should('include', productId['qwerty']);

		confirmation.getItems().each(($el, index, $list) => {
			let i = products.indexOf(
				$el.find('.title').eq(0).text().trim()
			);
			cy.wrap($el)
				.find('.title')
				.eq(0)
				.should('have.text', products[i]);
			cy.wrap($el)
				.find('.title')
				.eq(1)
				.should(
					'contain.text',
					'$ ' +
						prices[
							products[i]
								.split(' ')[0]
								.toLowerCase()
						]
				);
		});

		cy.wait('@createOrder').then((interception) => {
			orderId[0] = interception.response.body.productOrderId[0];
			orderId[1] = interception.response.body.productOrderId[1];
			orderId[2] = interception.response.body.productOrderId[2];
			orderId[3] = interception.response.body.productOrderId[3];

			confirmation.getOrderIds().each(($el, index, $list) => {
				cy.wrap($el).should(
					'contain.text',
					interception.response.body.orders[0]
				);
				cy.wrap($el).should(
					'contain.text',
					interception.response.body.orders[1]
				);
				cy.wrap($el).should(
					'contain.text',
					interception.response.body.orders[2]
				);
				cy.wrap($el).should(
					'contain.text',
					interception.response.body.orders[3]
				);
			});
		});

		confirmation.getDownloadButtons().each(($el, index, $list) => {
			cy.wrap($el).click();

			let downloadedFileName;

			if (index == 0)
				downloadedFileName =
					'order-invoice_santhoshsai4517.csv';
			else
				downloadedFileName =
					'order-invoice_santhoshsai4517.xlsx';
			const downloadsFolder = Cypress.config('downloadsFolder');

			cy.readFile(path.join(downloadsFolder, downloadedFileName), {
				timeout: 15000,
			}).should('exist'); // Asserts the file exists
		});
	});
});
