import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthForm } from "@/components/auth/auth-form"
import { useAuthStore } from "@/store/auth-store"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the auth store
jest.mock("@/store/auth-store")

const mockLogin = jest.fn()
const mockRegister = jest.fn()

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe("AuthForm", () => {
  beforeEach(() => {
    ;(useAuthStore as jest.Mock).mockReturnValue({
      login: mockLogin,
      register: mockRegister,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders login form by default", () => {
    render(<AuthForm />, { wrapper: createWrapper() })

    expect(screen.getByText("Sign In")).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("switches to register form when register tab is clicked", () => {
    render(<AuthForm />, { wrapper: createWrapper() })

    fireEvent.click(screen.getByText("Register"))

    expect(screen.getByText("Create Account")).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(<AuthForm />, { wrapper: createWrapper() })

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    })
  })

  it("calls login function with correct data", async () => {
    mockLogin.mockResolvedValue({})

    render(<AuthForm />, { wrapper: createWrapper() })

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    })
  })

  it("calls register function with correct data", async () => {
    mockRegister.mockResolvedValue({})

    render(<AuthForm />, { wrapper: createWrapper() })

    fireEvent.click(screen.getByText("Register"))

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "John Doe" },
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /create account/i }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith("test@example.com", "password123", "John Doe")
    })
  })
})
