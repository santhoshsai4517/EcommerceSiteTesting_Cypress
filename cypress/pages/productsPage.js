/** @format */

class productsPage {
	getLogoText() {
		return cy.get('h3');
	}

	getLogo() {
		return cy.get('.left.mt-1');
	}

	getHomeButton() {
		return cy.get('button[routerlink="/dashboard/"]');
	}

	getOrdersButton() {
		return cy.get('button[routerlink *= "/myorders"]');
	}

	getCartButton() {
		return cy.get('button[routerlink*="/cart"]');
	}

	getSignOutButton() {
		return cy.get('li:nth-child(5) button:nth-child(1)');
	}

	getProducts() {
		return cy.get('.card');
	}

	getProductsCount() {
		return cy.get('#res');
	}

	getSearchBox() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(1) > .form-control'
		);
	}

	getMinPriceBox() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(2) > .row > :nth-child(1) > .form-control'
		);
	}

	getMaxPriceBox() {
		return cy.get(
			'#sidebar > form.ng-valid > :nth-child(2) > .row > :nth-child(2) > .form-control'
		);
	}

	getFashionFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(3) > :nth-child(3) > input'
		);
	}

	getElectronisFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(3) > :nth-child(4) > input'
		);
	}

	getHouseHoldFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(3) > :nth-child(5) > input'
		);
	}

	getTshirtFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(4) > :nth-child(3) > input'
		);
	}

	getShirtsFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(4) > :nth-child(4) > input'
		);
	}

	getShoesFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(4) > :nth-child(5) > input'
		);
	}

	getMobileFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(4) > :nth-child(6) > input'
		);
	}

	getLaptopFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(4) > :nth-child(6) > input'
		);
	}

	getMenFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(5) > :nth-child(3) > input'
		);
	}

	getWomenFilter() {
		return cy.get(
			'#sidebar > form.ng-untouched > :nth-child(5) > :nth-child(3) > input'
		);
	}

	getPreviousPage() {
		return cy.get('.pagination-previous > .ng-star-inserted');
	}

	getNextPage() {
		return cy.get('.pagination-previous > .ng-star-inserted');
	}

	getNoProductsError() {
		return cy.get('.ng-trigger');
	}

	getProductdded() {
		return cy.get('div[role="alert"]');
	}

	getCartCount() {
		return cy.get('button[class="btn btn-custom"] label');
	}
}

export default productsPage;
