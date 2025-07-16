/// <reference types="cypress" />

import { cy } from "cypress"

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
    }
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit("/")
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get("button").contains("Sign In").click()
    cy.url().should("include", "/dashboard")
  })
})

Cypress.Commands.add("logout", () => {
  cy.get("button").contains("Logout").click()
  cy.url().should("eq", Cypress.config().baseUrl + "/")
})
