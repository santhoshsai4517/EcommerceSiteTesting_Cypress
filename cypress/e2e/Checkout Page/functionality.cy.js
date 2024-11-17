/** @format */
import cartPage from '../../pages/cartPage';
import checkoutPage from '../../pages/checkoutPage';
import loginPage from '../../pages/loginPage';
import productPage from '../../pages/productPage';
import productsPage from '../../pages/productsPage';

describe('Checkout page functionality', () => {
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

	it('When user clicks on checkout button validate product details in checkout page', () => {
		const prod = new productsPage();
		const cart = new cartPage();
		const checkout = new checkoutPage();

		checkout.getItems().should('have.length', products.length);

		checkout.getItems().each(($el, index, $list) => {
			let i = products.indexOf(
				$el.find('.item__title').text().trim()
			);
			cy.wrap($el)
				.find('.item__title')
				.should('contain.text', products[i]);
			cy.wrap($el)
				.find('.item__price')
				.should(
					'contain.text',
					prices[products[i].split(' ')[0].toLowerCase()]
				);
		});
	});

	it.only('When user provides checkout details and clicks on submit validate api call', () => {
		const prod = new productsPage();
		const cart = new cartPage();
		const checkout = new checkoutPage();

		cy.intercept('POST', '/api/ecom/order/create-order', (req) => {
			expect(req.body.orders).to.have.length(products.length);
		}).as('createOrder');

		checkout.getCountryField().type('ind');
		checkout.getCountriesList().each(($el, index, $list) => {
			if ($el.text().trim() === 'India') {
				cy.wrap($el).click();
			}
		});
		checkout.getCheckoutButton().click();

		cy.wait('@createOrder').then((interception) => {
			checkout
				.getOrderPlacedToast()
				.should('be.visible')
				.and('contain.text', 'Order Placed Successfully');
			expect(interception.response.body.message).to.eq(
				'Order Placed Successfully'
			);

			cy.url().should(
				'include',
				Cypress.config().baseUrl + '/dashboard/thanks?prop='
			);
		});
	});
});
