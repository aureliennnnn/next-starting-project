import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"
import { useAuthStore } from "@/store/auth-store"

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized()
        }
        return Promise.reject(error)
      },
    )
  }

  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth-token")
    }
    return null
  }

  private handleUnauthorized() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token")
      useAuthStore.getState().logout()
      window.location.href = "/login"
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config)
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch(url, data, config)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config)
  }
}

export const apiClient = new ApiClient()
