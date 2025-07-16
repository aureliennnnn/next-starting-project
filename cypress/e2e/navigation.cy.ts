import { describe, beforeEach, it } from "cypress"
import Cypress from "cypress"

describe("Navigation", () => {
  beforeEach(() => {
    // Mock authentication
    cy.window().then((win) => {
      win.localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            user: {
              id: "1",
              name: "Test User",
              email: "test@example.com",
              createdAt: new Date().toISOString(),
            },
          },
        }),
      )
    })
    cy.visit("/")
  })

  it("should navigate between pages", () => {
    // Test navigation to dashboard
    cy.get("a").contains("Dashboard").click()
    cy.url().should("include", "/dashboard")
    cy.get("h1").contains("Dashboard").should("be.visible")

    // Test navigation to settings
    cy.get("a").contains("Settings").click()
    cy.url().should("include", "/settings")
    cy.get("h1").contains("Settings").should("be.visible")

    // Test navigation back to home
    cy.get("a").contains("Home").click()
    cy.url().should("eq", Cypress.config().baseUrl + "/")
  })

  it("should show mobile menu on small screens", () => {
    cy.viewport("iphone-6")
    cy.get('[aria-label="Toggle menu"]').should("be.visible")
    cy.get('[aria-label="Toggle menu"]').click()
    cy.get("a").contains("Dashboard").should("be.visible")
  })

  it("should logout successfully", () => {
    cy.get("button").contains("Logout").click()
    cy.url().should("eq", Cypress.config().baseUrl + "/")
    cy.get('[data-testid="auth-form"]').should("be.visible")
  })
})
