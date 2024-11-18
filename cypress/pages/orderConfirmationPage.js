/** @format */

class orderConfirmationPage {
	getItems() {
		return cy.get('.line-item.ng-star-inserted');
	}

	getOrdersLink() {
		return cy.get('label[routerlink="/dashboard/myorders"]');
	}

	getOrderIds() {
		return cy.get(
			'tr[class="ng-star-inserted"] td[class="em-spacer-1"]'
		);
	}

	getDownloadButtons() {
		return cy.get('tr td table tbody tr button');
	}
}

export default orderConfirmationPage;
