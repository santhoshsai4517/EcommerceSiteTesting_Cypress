/** @format */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
	projectId: '9jgiau',
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		viewportWidth: 1920,
		viewportHeight: 1080,
		specPattern: 'cypress/e2e/**/*.cy.js',
		baseUrl: 'https://rahulshettyacademy.com/client',
	},
});
