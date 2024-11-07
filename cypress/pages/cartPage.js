/** @format */

class cartPage {
	getCartTitle() {
		return cy.get('div[class="heading cf"] h1');
	}

	getNoProductsToast() {
		// cy.get('toast-error')
		// 	.should('exist') // Waits for it to be added to the DOM
		// 	.and('be.visible');

		return cy.get('.toast-error');
	}

	getNoProductsText() {
		return cy.get('div[class="ng-star-inserted"] h1');
	}

	getContinueShoppingButton() {
		return cy.get('button[routerlink="/dashboard"]');
	}

	getCart() {
		return cy.get('.cartWrap');
	}

	getSubtotal() {
		return cy.get(':nth-child(1) > .value');
	}

	getTotal() {
		return cy.get(':nth-child(2) > .value');
	}

	getCheckoutButton() {
		return cy.get('.totalRow .btn-primary');
	}
}

export default cartPage;
