import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const user: User = {
            id: "1",
            name: "John Doe",
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            createdAt: new Date().toISOString(),
          }

          set({ user, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error("Login failed")
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true })
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const user: User = {
            id: Date.now().toString(),
            name,
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            createdAt: new Date().toISOString(),
          }

          set({ user, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw new Error("Registration failed")
        }
      },

      logout: () => {
        set({ user: null })
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...userData } })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
