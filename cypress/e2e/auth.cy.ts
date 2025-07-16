import { describe, beforeEach, it } from "cypress"

describe("Authentication Flow", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should display login form by default", () => {
    cy.get('[data-testid="auth-form"]').should("be.visible")
    cy.get('input[type="email"]').should("be.visible")
    cy.get('input[type="password"]').should("be.visible")
    cy.get("button").contains("Sign In").should("be.visible")
  })

  it("should switch to register form", () => {
    cy.get("button").contains("Register").click()
    cy.get('input[placeholder="Enter your name"]').should("be.visible")
    cy.get("button").contains("Create Account").should("be.visible")
  })

  it("should show validation errors for empty fields", () => {
    cy.get("button").contains("Sign In").click()
    cy.get("p").contains("Invalid email address").should("be.visible")
    cy.get("p").contains("Password must be at least 6 characters").should("be.visible")
  })

  it("should login successfully with valid credentials", () => {
    cy.get('input[type="email"]').type("test@example.com")
    cy.get('input[type="password"]').type("password123")
    cy.get("button").contains("Sign In").click()

    // Should redirect to dashboard after successful login
    cy.url().should("include", "/dashboard")
    cy.get("h1").contains("Dashboard").should("be.visible")
  })

  it("should register successfully with valid data", () => {
    cy.get("button").contains("Register").click()
    cy.get('input[placeholder="Enter your name"]').type("John Doe")
    cy.get('input[type="email"]').type("john@example.com")
    cy.get('input[type="password"]').type("password123")
    cy.get("button").contains("Create Account").click()

    // Should redirect to dashboard after successful registration
    cy.url().should("include", "/dashboard")
    cy.get("h1").contains("Dashboard").should("be.visible")
  })
})
