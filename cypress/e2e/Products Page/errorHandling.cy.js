/** @format */

import loginPage from '../../pages/loginPage';
import productsPage from '../../pages/productsPage';

describe('Product page error handling validations', () => {
	beforeEach(() => {
		const login = new loginPage();

		cy.visit('/');

		cy.login('santhoshsai4517@gmail.com', '151Fa04124@4517');
	});

	it('When get products api is failed error occurs', () => {
		cy.intercept('POST', '/api/ecom/product/get-all-products', {
			statusCode: 404, // Unauthorized status code
			body: { error: 'Unknown error occured', count: 0 }, // Custom error message
		}).as('failedCall');

		cy.wait('@failedCall').then((interception) => {
			const prodPage = new productsPage();
			const prodCount = interception.response.body.count;

			prodPage.getProducts().should('not.exist');
		});
	});

	it('When user applies filter that returns no products error occurs', () => {
		cy.wait(2000);
		const prod = new productsPage();

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
					't-shirts',
				]);
			}
		).as('getProductRequest');

		prod.getTshirtFilter().click();

		cy.wait('@getProductRequest').then((interception) => {
			prod.getProducts().should('not.exist');
			prod.getNoProductsError().should(
				'contain.text',
				'No Products Found'
			);
		});
	});

	it.only('When user clicks on add product to cart and add to cart is failed error occurs', () => {
		cy.wait(2000);

		const prodPage = new productsPage();

		const products = ['ZARA COAT 3'];

		prodPage.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				const prodName = $el.find('b').text();
				// cy.log(prodName);

				let count = 1;

				cy.intercept('POST', '/api/ecom/user/add-to-cart', {
					statusCode: 500, // Unauthorized status code
					body: { error: 'Unknown error occured' }, // Custom error message
				}).as('add-to-cart');

				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
				cy.wait('@add-to-cart').then((intercept) => {});
			}
		});

		prodPage.getCartCount().should('be.not.visible');
	});
});
