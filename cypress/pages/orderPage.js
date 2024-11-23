/** @format */

class orderPage {
	getOrderId() {
		return cy.get('.col-text');
	}

	getProductName() {
		return cy.get('.title');
	}

	getProductPrice() {
		return cy.get('.price');
	}

	getAddress() {
		return cy.get('.text');
	}

	getViewOrdersButton() {
		return cy.get('.btn.-teal');
	}

	getErrorText() {
		return cy.get('.blink_me');
	}
}

export default orderPage;
