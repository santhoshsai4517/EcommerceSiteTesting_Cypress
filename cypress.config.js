/** @format */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
	// video: true,
	projectId: '9jgiau',
	e2e: {
		retries: {
			runMode: 2, // Number of retries when running tests in CLI
			openMode: 0, // Number of retries when running tests in Cypress GUI
		},
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		viewportWidth: 1920,
		viewportHeight: 1080,
		specPattern: 'cypress/e2e/**/*.cy.js',
		baseUrl: 'https://rahulshettyacademy.com/client',
	},
});
