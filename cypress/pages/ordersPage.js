/** @format */

class ordersPage {
	getGoBackToShopButton() {
		return cy.get('button[routerlink="/dashboard"]');
	}

	getGoBackToCartButton() {
		return cy.get('.row button[routerlink="/dashboard/cart"]');
	}

	getOrders() {
		return cy.get('tr.ng-star-inserted');
	}

	getOrderDeletedToast() {
		return cy.get('.ng-trigger');
	}

	getNoProductsText() {
		return cy.get('.mt-4');
	}

	getUnknownErrorToast() {
		return cy.get('.toast-error');
	}
}

export default ordersPage;
