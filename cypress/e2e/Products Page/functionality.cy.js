/** @format */

import cartPage from '../../pages/cartPage';
import loginPage from '../../pages/loginPage';
import productPage from '../../pages/productPage';
import productsPage from '../../pages/productsPage';

describe('Prodcts page functionality validation', () => {
	beforeEach(() => {
		const login = new loginPage();

		cy.visit('/');

		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
	});

	it('When user clicks on logout button login page is displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();
		const login = new loginPage();

		prodPage.getSignOutButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/auth/login');
		login.getSignOutMessage().should(
			'contain.text',
			'Logout Successfully'
		);
	});

	it('When user clicks on orders button orders page is displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();
		prodPage.getOrdersButton().click();
		cy.url().should(
			'eq',
			Cypress.config().baseUrl + '/dashboard/myorders'
		);
	});

	it('When user clicks on cart button cart page is displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();
		const cart = new cartPage();
		prodPage.getCartButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/cart');
		cart.getCartTitle().should('contain.text', 'My Cart');
	});

	it('When user clicks on home home page is displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();
		prodPage.getHomeButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user lands on products page all products are displayed', () => {
		const prodPage = new productsPage();
		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(null);
				expect(req.body.minPrice).to.equal(null);
				expect(req.body.productCategory).to.deep.equal([]);
				expect(req.body.productFor).to.deep.equal([]);
				expect(req.body.productName).to.equal('');
				expect(req.body.productSubCategory).to.deep.equal([]);
			}
		).as('getProductRequest');

		cy.wait('@getProductRequest').then((interception) => {
			const prodCount = interception.response.body.count;
			prodPage.getProducts().then((products) => {
				expect(products).to.have.length(prodCount);
			});
			prodPage.getProductsCount().should('contain.text', prodCount);
		});
	});

	it('When user clicks on view button on product product details are displayed', () => {
		const prodPage = new productsPage();
		let productsfromapi;

		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(null);
				expect(req.body.minPrice).to.equal(null);
				expect(req.body.productCategory).to.deep.equal([]);
				expect(req.body.productFor).to.deep.equal([]);
				expect(req.body.productName).to.equal('');
				expect(req.body.productSubCategory).to.deep.equal([]);
			}
		).as('getProductRequest');

		cy.wait('@getProductRequest').then((interception) => {
			productsfromapi = interception.response.body.data;
			const products = prodPage.getProducts();
			const prodDetailsPage = new productPage();
			let product;
			products.each(($el, index, $list) => {
				cy.log($list);
				cy.log($el);
				cy.wrap($el)
					.find('b')
					.invoke('text')
					.then((text) => {
						product = productsfromapi.filter(
							(p) => p.productName === text
						);
						cy.wrap($el)
							.find('b')
							.should(
								'contain.text',
								product[0].productName
							);
						cy.wrap($el)
							.find('.text-muted')
							.should(
								'contain.text',
								product[0].productPrice
							);
					});
			});
		});
	});

	it('When user lands on products page and searches for product products are displayed', () => {
		const prodPage = new productsPage();

		prodPage.getSearchBox().type('ADIDAS');
		prodPage.getSearchBox().blur();
		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(null);
				expect(req.body.minPrice).to.equal(null);
				expect(req.body.productCategory).to.deep.equal([]);
				expect(req.body.productFor).to.deep.equal([]);
				expect(req.body.productName).to.equal('ADIDAS');
				expect(req.body.productSubCategory).to.deep.equal([]);
			}
		).as('getProductRequest');
		cy.wait('@getProductRequest').then((interception) => {
			const prodCount = interception.response.body.count;
			prodPage.getProducts().then((products) => {
				expect(products).to.have.length(prodCount);
			});
			prodPage.getProductsCount().should('contain.text', prodCount);
		});
	});

	it('When user enters price range products are displayed', () => {
		const prodPage = new productsPage();

		// cy.debug();
		// cy.pause();

		prodPage.getMinPriceBox().type('20000');
		prodPage.getMinPriceBox().blur();
		prodPage.getMaxPriceBox().type('35000');
		prodPage.getMaxPriceBox().blur();

		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(35000);
				expect(req.body.minPrice).to.equal(20000);
				expect(req.body.productCategory).to.deep.equal([]);
				expect(req.body.productFor).to.deep.equal([]);
				expect(req.body.productName).to.equal('');
				expect(req.body.productSubCategory).to.deep.equal([]);
			}
		).as('getProductRequest');

		cy.wait('@getProductRequest').then((interception) => {
			const prodCount = interception.response.body.count;
			prodPage.getProducts().then((products) => {
				expect(products).to.have.length(prodCount);
			});
			prodPage.getProductsCount().should('contain.text', prodCount);
		});
	});

	it('When user selects category filters then products are displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();

		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(null);
				expect(req.body.minPrice).to.equal(null);
				expect(req.body.productCategory).to.deep.equal([
					'fashion',
				]);
				expect(req.body.productFor).to.deep.equal([]);
				expect(req.body.productName).to.equal('');
				expect(req.body.productSubCategory).to.deep.equal([]);
			}
		).as('getProductRequest');

		prodPage.getFashionFilter().click();

		cy.wait('@getProductRequest').then((interception) => {
			const prodCount = interception.response.body.count;
			prodPage.getProducts().then((products) => {
				expect(products).to.have.length(prodCount);
			});
			prodPage.getProductsCount().should('contain.text', prodCount);
		});
	});

	it('When user selects sub category filters then products are displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();

		prodPage.getShirtsFilter().click();
		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(null);
				expect(req.body.minPrice).to.equal(null);
				expect(req.body.productCategory).to.deep.equal([]);
				expect(req.body.productFor).to.deep.equal([]);
				expect(req.body.productName).to.equal('');
				expect(req.body.productSubCategory).to.deep.equal([
					'shirts',
					'shoes',
				]);
			}
		).as('getProductRequest');
		prodPage.getShoesFilter().click();

		cy.wait('@getProductRequest').then((interception) => {
			const prodCount = interception.response.body.count;
			prodPage.getProducts().then((products) => {
				expect(products).to.have.length(prodCount);
			});
			prodPage.getProductsCount().should('contain.text', prodCount);
		});
	});

	it('When user selects search f filters then products are displayed', () => {
		cy.wait(2000);
		const prodPage = new productsPage();

		cy.intercept(
			'POST',
			'/api/ecom/product/get-all-products',
			(req) => {
				expect(req.body.maxPrice).to.equal(null);
				expect(req.body.minPrice).to.equal(null);
				expect(req.body.productCategory).to.deep.equal([]);
				expect(req.body.productFor).to.deep.equal(['men']);
				expect(req.body.productName).to.equal('');
				expect(req.body.productSubCategory).to.deep.equal([]);
			}
		).as('getProductRequest');

		prodPage.getMenFilter().click();

		cy.wait('@getProductRequest').then((interception) => {
			const prodCount = interception.response.body.count;
			prodPage.getProducts().then((products) => {
				expect(products).to.have.length(prodCount);
			});
			prodPage.getProductsCount().should('contain.text', prodCount);
		});
	});

	it('When user clicks on add to cart products are added to cart', () => {
		cy.wait(2000);

		const prodPage = new productsPage();

		const products = ['ZARA COAT 3', 'ADIDAS ORIGINAL'];

		prodPage.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				const prodName = $el.find('b').text();
				// cy.log(prodName);

				let count = 1;

				cy.intercept(
					'POST',
					'/api/ecom/user/add-to-cart',
					(req) => {
						if (count < products.length) {
							count++;
							expect(
								req.body.product.productName
							).to.equal(prodName);
						}
					}
				).as('add-to-cart');

				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
				cy.wait('@add-to-cart').then((intercept) => {
					prodPage
						.getProductdded()
						.should(
							'contain.text',
							'Product Added To Cart '
						);
				});

				cy.wait(2000);

				// cy.get('.ngx-spinner-overlay').should('be.not.visible');
			}
		});

		prodPage.getCartCount().should('contain.text', products.length);
	});

	afterEach(() => {
		cy.clearAllCookies(); // This removes any residual intercepts after each test
	});
});
