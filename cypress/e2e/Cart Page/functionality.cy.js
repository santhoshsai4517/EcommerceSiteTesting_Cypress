/** @format */

import cartPage from '../../pages/cartPage';
import loginPage from '../../pages/loginPage';
import productPage from '../../pages/productPage';
import productsPage from '../../pages/productsPage';

describe('Cart page functionality validations', () => {
	beforeEach(() => {
		const login = new loginPage();
		const prod = new productsPage();

		cy.visit('/');
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		prod.getCartButton().click();
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

	it('When user clicks on continue shopping button home page is displayed', () => {
		const prod = new productsPage();
		const cart = new cartPage();

		cart.getContinueShoppingButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When no products are present in cart message is displayed', () => {
		const cart = new cartPage();

		cart.getNoProductsText().should(
			'contain.text',
			'No Products in Your Cart !'
		);

		cart.getNoProductsToast()
			.should('exist')
			.then((el) => {
				expect(el.text()).to.contain('No Product in Your Cart');
			});
	});

	it('When user adds a product to cart and logs out products are removed from cart', () => {
		const login = new loginPage();
		const prodPage = new productsPage();
		const cart = new cartPage();

		prodPage.getHomeButton().click();

		const products = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];

		prodPage.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
			}
		});

		prodPage.getCartButton().click();
		cart.getCart().should('have.length', products.length);

		prodPage.getSignOutButton().click();
		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
		prodPage.getCartButton().click();

		cart.getNoProductsText().should(
			'contain.text',
			'No Products in Your Cart !'
		);

		cart.getNoProductsToast()
			.should('exist')
			.then((el) => {
				expect(el.text()).to.contain('No Product in Your Cart');
			});
	});

	it('When user adds products to cart product details are displayed in cart', () => {
		const prodPage = new productsPage();
		const cart = new cartPage();

		prodPage.getHomeButton().click();

		const products = ['ZARA COAT 3', 'qwerty', 'ADIDAS ORIGINAL'];
		let prices = {
			zara: 31500,
			adidas: 31500,
			iphone: 231500,
			qwerty: 11500,
		};

		prodPage.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
			}
		});

		prodPage.getCartButton().click();
		cart.getCart().should('have.length', products.length);
		cart.getCart().each(($el, index, $list) => {
			let i;
			i = products.indexOf($el.find('.cartSection h3').text());
			cy.wrap($el)
				.find('.cartSection h3')
				.should('contain.text', products[i]);
			cy.wrap($el)
				.find('.cartSection p:nth-child(4)')
				.should(
					'contain.text',
					prices[products[i].split(' ')[0].toLowerCase()]
				);
			cy.wrap($el)
				.find('.cartSection p:nth-child(1)')
				.should(
					'contain.text',
					prices[products[i].split(' ')[0].toLowerCase()]
				);
		});

		cart.getCart().each(($el, index, $list) => {
			const deleteProd = ['ZARA COAT 3'];
			if (deleteProd.includes($el.find('.cartSection h3').text())) {
				cy.wrap($el).find('.btn-danger').click();
			}
		});

		cart.getCart().should('have.length', products.length - 1);

		function processCartItem(index, totalItems) {
			if (index >= totalItems) return;
			cart.getCart()
				.eq(index)
				.within(() => {
					cy.get('.cartSection .btn-primary').click();
				});

			cy.url().should(
				'include',
				Cypress.config().baseUrl + '/dashboard/order'
			);
			prodPage.getCartButton().click();

			cy.url()
				.should(
					'include',
					Cypress.config().baseUrl + '/dashboard/cart'
				)
				.then(() => {
					processCartItem(index + 1, totalItems);
				});
		}

		cart.getCart().then(($list) => {
			processCartItem(0, $list.length);
		});
	});

	it('When user adds products to cart product details are displayed in cart', () => {
		const prodPage = new productsPage();
		const cart = new cartPage();

		prodPage.getHomeButton().click();

		const products = ['ZARA COAT 3', 'qwerty', 'ADIDAS ORIGINAL'];
		let prices = {
			zara: 31500,
			adidas: 31500,
			iphone: 231500,
			qwerty: 11500,
		};
		prodPage.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
			}
		});

		prodPage.getCartButton().click();

		let total = 0;

		cart.getCart()
			.each(($el, index, $list) => {
				let i;
				i = products.indexOf(
					$el.find('.cartSection h3').text()
				);

				total += parseInt(
					$el
						.find('.cartSection p:nth-child(1)')
						.text()
						.split(' ')[1]
				);
			})
			.then(() => {
				cart.getSubtotal().should(
					'contain.text',
					total.toString()
				);
				cart.getTotal().should(
					'contain.text',
					total.toString()
				);
			});

		cart.getCart().each(($el, index, $list) => {
			const deleteProd = ['ZARA COAT 3'];
			if (deleteProd.includes($el.find('.cartSection h3').text())) {
				cy.wrap($el).find('.btn-danger').click();
			}
		});

		cy.wait(1000);

		cart.getCart()
			.each(($el, index, $list) => {
				let i;
				i = products.indexOf(
					$el.find('.cartSection h3').text()
				);

				total += parseInt(
					$el
						.find('.cartSection p:nth-child(1)')
						.text()
						.split(' ')[1]
				);
			})
			.then(() => {
				cart.getSubtotal().should(
					'contain.text',
					total.toString()
				);
				cart.getTotal().should(
					'contain.text',
					total.toString()
				);
			});

		cart.getCheckoutButton().click();
		cy.url().should(
			'include',
			Cypress.config().baseUrl + '/dashboard/order'
		);
	});

	afterEach(() => {
		cy.clearAllCookies(); // This removes any residual intercepts after each test
	});
});
