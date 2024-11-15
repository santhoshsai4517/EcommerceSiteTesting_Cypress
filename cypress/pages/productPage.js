/** @format */

class productPage {
	getProductName() {
		return cy.get('h2');
	}

	getProductPrice() {
		return cy.get('div[class="col-lg-6 rtl-text"] div h3');
	}

	getAddtoCartButton() {
		return cy.get('.product-buttons button');
	}

	getProductDetails() {
		return cy.get('.border-product p');
	}

	getContinueShoppingButton() {
		return cy.get('.continue');
	}

	getProductAddedToCart() {
		return cy.get('div[role="alert"]');
	}
}

export default productPage;
