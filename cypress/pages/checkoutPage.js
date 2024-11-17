/** @format */

class checkoutPage {
	getCheckoutButton() {
		return cy.get('.actions a');
	}

	getCountryField() {
		return cy.get('input[placeholder="Select Country"]');
	}

	getCountriesList() {
		return cy.get('button span');
	}

	getItems() {
		return cy.get('.item__details');
	}

	getErrorToast() {
		return cy.get(
			'div[aria-label="Please Enter Full Shipping Information"]'
		);
	}

	getEmptyCountryError() {
		return cy.get(
			'div[aria-label="Please Enter Full Shipping Information"]'
		);
	}

	getOrderPlacedToast() {
		return cy.get('div[aria-label="Order Placed Successfully"]');
	}
}

export default checkoutPage;
