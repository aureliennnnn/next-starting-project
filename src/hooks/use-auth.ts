"use client"

import { useAuthStore } from "@/store/auth-store"
import { useBackend } from "./use-backend"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function useAuth() {
  const { user, login: storeLogin, register: storeRegister, logout: storeLogout } = useAuthStore()
  const { adapter } = useBackend()
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      const response = await adapter.auth(email, password)

      // Store JWT token
      if (response.token || response.access_token) {
        localStorage.setItem("auth-token", response.token || response.access_token)
      }

      await storeLogin(email, password)
      router.push("/dashboard")
      toast.success("Logged in successfully!")
    } catch (error) {
      toast.error("Login failed. Please check your credentials.")
      throw error
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await adapter.register(name, email, password)

      // Store JWT token
      if (response.token || response.access_token) {
        localStorage.setItem("auth-token", response.token || response.access_token)
      }

      await storeRegister(email, password, name)
      router.push("/dashboard")
      toast.success("Account created successfully!")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
      throw error
    }
  }

  const logout = async () => {
    try {
      await adapter.logout()
      localStorage.removeItem("auth-token")
      storeLogout()
      router.push("/")
      toast.success("Logged out successfully!")
    } catch (error) {
      // Even if backend logout fails, clear local state
      localStorage.removeItem("auth-token")
      storeLogout()
      router.push("/")
    }
  }

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}
