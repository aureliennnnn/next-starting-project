"use client"

import type React from "react"

import { renderHook, act } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuth } from "@/hooks/use-auth"
import { useAuthStore } from "@/store/auth-store"
import { useBackend } from "@/hooks/use-backend"
import jest from "jest" // Declaring the jest variable

const mockAdapter = {
  auth: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
}

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

describe("useAuth", () => {
  beforeEach(() => {
    ;(useAuthStore as jest.Mock).mockReturnValue({
      user: null,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
    })
    ;(useBackend as jest.Mock).mockReturnValue({
      adapter: mockAdapter,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should login successfully", async () => {
    mockAdapter.auth.mockResolvedValue({ token: "test-token" })

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    })

    await act(async () => {
      await result.current.login("test@example.com", "password")
    })

    expect(mockAdapter.auth).toHaveBeenCalledWith("test@example.com", "password")
  })

  it("should register successfully", async () => {
    mockAdapter.register.mockResolvedValue({ token: "test-token" })

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    })

    await act(async () => {
      await result.current.register("test@example.com", "password", "John Doe")
    })

    expect(mockAdapter.register).toHaveBeenCalledWith("John Doe", "test@example.com", "password")
  })

  it("should logout successfully", async () => {
    mockAdapter.logout.mockResolvedValue({})

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    })

    await act(async () => {
      await result.current.logout()
    })

    expect(mockAdapter.logout).toHaveBeenCalled()
  })
})
