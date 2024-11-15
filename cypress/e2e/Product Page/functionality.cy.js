/** @format */

import cartPage from '../../pages/cartPage';
import loginPage from '../../pages/loginPage';
import productPage from '../../pages/productPage';
import productsPage from '../../pages/productsPage';

describe('Prodcts page functionality validation', () => {
	const products = [
		'ZARA COAT 3',
		'ADIDAS ORIGINAL',
		'IPHONE 13 PRO',
		'qwerty',
	];

	let prices = {
		zara: 31500,
		adidas: 31500,
		iphone: 231500,
		qwerty: 11500,
	};

	beforeEach(() => {
		const login = new loginPage();

		cy.visit('/');

		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
	});

	it('When user clicks on logout button login page is displayed', () => {
		const prod = new productsPage();
		const login = new loginPage();

		prod.getProducts().each(($el, index, $list) => {
			if (products[0] === $el.find('b').text()) {
				cy.wrap($el).find('.w-40').click();
				// cy.wait(2000);
			}
		});

		prod.getSignOutButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/login');
		login.getSignOutMessage().should(
			'contain.text',
			'Logout Successfully'
		);
	});

	it('When user clicks on orders button orders page is displayed', () => {
		const prod = new productsPage();

		prod.getProducts().each(($el, index, $list) => {
			if (products[0] === $el.find('b').text()) {
				cy.wrap($el).find('.w-40').click();
				// cy.wait(2000);
			}
		});

		prod.getOrdersButton().click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl + '/dashboard/myorders'
		);
	});

	it('When user clicks on cart button cart page is displayed', () => {
		const prod = new productsPage();
		const cart = new cartPage();

		prod.getProducts().each(($el, index, $list) => {
			if (products[0] === $el.find('b').text()) {
				cy.wrap($el).find('.w-40').click();
				// cy.wait(2000);
			}
		});

		prod.getCartButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/cart');
		cart.getCartTitle().should('contain.text', 'My Cart');
	});

	it('When user clicks on home home page is displayed', () => {
		const prod = new productsPage();

		prod.getProducts().each(($el, index, $list) => {
			if (products[0] === $el.find('b').text()) {
				cy.wrap($el).find('.w-40').click();
				// cy.wait(2000);
			}
		});

		prod.getHomeButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user clicks on logo home page is displayed', () => {
		const prod = new productsPage();

		prod.getProducts().each(($el, index, $list) => {
			if (products[0] === $el.find('b').text()) {
				cy.wrap($el).find('.w-40').click();
				// cy.wait(2000);
			}
		});

		prod.getLogo().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user clicks on continue shopping home page is displayed', () => {
		const prod = new productsPage();
		const product = new productPage();

		cy.wait(1000);

		prod.getProducts().each(($el, index, $list) => {
			if (products[0] === $el.find('b').text()) {
				cy.wrap($el).find('.w-40').click();
			}
		});

		product.getContinueShoppingButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user clicks on add to cart product is added to cart', () => {
		const prod = new productsPage();
		const product = new productPage();
		const cart = new cartPage();

		cy.wait(1000);

		function productProcessor(index, totalItems) {
			if (index >= totalItems) return;
			const el = prod.getProducts().eq(index);
			let prodName;
			let i;
			prod.getProducts()
				.eq(index)
				.within(() => {
					cy.get('b').then(($text) => {
						prodName = $text.text();
						i = products.indexOf(prodName);
					});

					cy.get('.w-40').click();
				});

			cy.wait(1000);

			product.getProductName().should('have.text', products[index]);
			product
				.getProductPrice()
				.should(
					'have.text',
					'$ ' +
						prices[
							products[index]
								.split(' ')[0]
								.toLowerCase()
						]
				);
			product.getAddtoCartButton().click();
			prod.getCartCount().should('have.text', index + 1);
			product
				.getProductAddedToCart()
				.should('be.visible')
				.should('include.text', 'Product Added To Cart');
			product.getContinueShoppingButton().click();
			productProcessor(index + 1, totalItems);
		}

		prod.getProducts().then(($list) => {
			productProcessor(0, $list.length);
		});

		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');

		prod.getCartButton().click();
		cart.getCart().should('have.length', products.length);
	});

	afterEach(() => {
		cy.clearAllCookies(); // This removes any residual intercepts after each test
	});
});
