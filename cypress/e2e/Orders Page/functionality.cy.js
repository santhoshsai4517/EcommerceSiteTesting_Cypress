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
		cy.wait(1000);
		prod.getProducts().each(($el, index, $list) => {
			if (products.includes($el.find('b').text())) {
				cy.wrap($el).find('button.w-10').click();
				cy.wait(2000);
			}
		});
		prod.getCartButton().click();
		cy.wait(2000);
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
		confirmation.getOrdersLink().click();

		cy.wait('@createOrder').then((interception) => {
			orderIds[0] = interception.response.body.orders[0];
			orderIds[1] = interception.response.body.orders[1];
			orderIds[2] = interception.response.body.orders[2];
			orderIds[3] = interception.response.body.orders[3];
		});
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

	it('When user clicks on go back to shop button products page is displayed', () => {
		const orders = new ordersPage();

		orders.getGoBackToShopButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/dash');
	});

	it('When user clicks on go back to cart button cart page is displayed', () => {
		const orders = new ordersPage();

		orders.getGoBackToCartButton().click();
		cy.url().should('eq', Cypress.config().baseUrl + '/dashboard/cart');
	});

	it('When there are no orders no orders text should be displayed', () => {
		const orders = new ordersPage();
		const prod = new productsPage();

		prod.getSignOutButton().click();

		cy.login('s1234@gmail.com', '123');

		cy.intercept('GET', '**/get-orders-for-customer/*', (req) => {}).as(
			'getOrders'
		);

		prod.getOrdersButton().click();

		cy.wait('@getOrders').then((interception) => {
			expect(interception.response.body.message).to.equal(
				'No Orders'
			);
			expect(interception.response.body.data).to.be.empty;
		});

		orders.getNoProductsText().should(
			'have.text',
			' You have No Orders to show at this time. Please Visit Back Us '
		);
	});

	it('When user lands on orders page orders should be displayed', () => {
		const orders = new ordersPage();
		const prod = new productsPage();

		cy.intercept('GET', '**/get-orders-for-customer/*', (req) => {}).as(
			'getOrders'
		);

		prod.getHomeButton().click();
		prod.getOrdersButton().click();

		cy.wait('@getOrders').then((interception) => {
			expect(interception.response.body.message).to.equal(
				'Orders fetched for customer Successfully'
			);
			expect(interception.response.body.data).to.be.not.empty;
			orders.getOrders().should(
				'have.length',
				interception.response.body.count
			);
		});
	});

	it('When user clicks on delete button order is deleted', () => {
		const orders = new ordersPage();
		const prod = new productsPage();
		let count = 0;

		orders.getOrders().each(($el, index, $list) => {
			orders.getOrders().then(($orders) => {
				if (index >= $orders.length) return;
				else {
					orders.getOrders()
						.eq(index) // Use index to get the correct row
						.find('td:nth-child(3)')
						.invoke('text') // Extract the text
						.then((prodName) => {
							const productName = prodName.trim(); // Trim extra spaces
							cy.log(productName);

							if (productName === 'IPHONE 13 PRO') {
								cy.intercept(
									'DELETE',
									'**/delete-order/*',
									(req) => {}
								).as('deleteOrder');

								count--;

								// Click the delete button for the matching order
								orders.getOrders()
									.eq(index) // Target the same index
									.find('.btn-danger')
									.click();

								// Wait for the DELETE API call to complete
								cy.wait('@deleteOrder').then(
									(interception) => {
										// Validate the response message
										orders.getOrderDeletedToast().should(
											'contain.text',
											'Orders Deleted Successfully'
										);
										expect(
											interception
												.response
												.body
												.message
										).to.equal(
											'Orders Deleted Successfully'
										);
									}
								);

								cy.wait(2000);
							}
						});
				}
			});
		});
	});

	it('When user clicks on view button order is displayed', () => {
		const orders = new ordersPage();
		const prod = new productsPage();
		const order = new orderPage();

		const viewOrder = (index, orderCount) => {
			if (index >= orderCount) return;

			orders.getOrders()
				.eq(index)
				.find('th')
				.invoke('text')
				.then((Id) => {
					const orderId = Id.trim();
					cy.log(orderId);

					if (orderIds.includes(orderId)) {
						cy.intercept(
							'GET',
							'**/get-orders-details?id=' + orderId,
							(req) => {}
						).as('viewOrder');

						orders.getOrders()
							.eq(index) // Target the same index
							.find('.btn-primary')
							.click();

						cy.url().should(
							'eq',
							Cypress.config().baseUrl +
								'/dashboard/order-details/' +
								orderId
						);

						cy.wait('@viewOrder').then(
							(interception) => {
								const prodName =
									interception.response.body
										.data.productName;
								const prodPrice =
									prices[
										prodName
											.split(' ')[0]
											.toLowerCase()
									];

								order.getOrderId().should(
									'have.text',
									orderId
								);

								order.getProductName().should(
									'contain.text',
									prodName
								);
								order.getProductPrice().should(
									'contain.text',
									'$ ' + prodPrice
								);

								order.getAddress()
									.eq(0)
									.should(
										'contains.text',
										'santhoshsai4517@gmail.com'
									);

								order.getAddress()
									.eq(1)
									.should(
										'contain.text',
										'India'
									);

								order.getAddress()
									.eq(2)
									.should(
										'contain.text',
										'santhoshsai4517@gmail.com'
									);

								order.getAddress()
									.eq(3)
									.should(
										'contain.text',
										'India'
									);

								expect(
									interception.response.body
										.message
								).to.be.equal(
									'Orders fetched for customer Successfully'
								);

								expect(
									interception.response.body
										.data.orderBy
								).to.be.equal(
									'santhoshsai4517@gmail.com'
								);

								expect(
									interception.response.body
										.data.country
								).to.be.equal('India');

								// cy.log(
								// 	interception.response.body
								// 		.data._id
								// );

								expect(
									interception.response.body
										.data._id
								).to.be.equal(orderId);

								expect(
									interception.response.body
										.data.orderPrice
								).to.be.equal('' + prodPrice);
							}
						);
						order.getViewOrdersButton().click();
					}
				});

			cy.url().should(
				'eq',
				Cypress.config().baseUrl + '/dashboard/myorders'
			);

			return;
		};

		orders.getOrders().each(($el, index, $list) => {
			viewOrder(index, $list.length);
		});
	});
});
