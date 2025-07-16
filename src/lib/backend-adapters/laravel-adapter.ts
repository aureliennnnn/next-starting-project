import { apiClient } from "../api-client"

export class LaravelAdapter {
  private baseUrl: string

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_LARAVEL_API_URL || "") {
    this.baseUrl = baseUrl
  }

  async auth(email: string, password: string) {
    return apiClient.post(`${this.baseUrl}/api/auth/login`, {
      email,
      password,
    })
  }

  async register(name: string, email: string, password: string) {
    return apiClient.post(`${this.baseUrl}/api/auth/register`, {
      name,
      email,
      password,
      password_confirmation: password,
    })
  }

  async getUser() {
    return apiClient.get(`${this.baseUrl}/api/user`)
  }

  async logout() {
    return apiClient.post(`${this.baseUrl}/api/auth/logout`)
  }

  async getItems() {
    return apiClient.get(`${this.baseUrl}/api/items`)
  }

  async createItem(data: any) {
    return apiClient.post(`${this.baseUrl}/api/items`, data)
  }

  async updateItem(id: string, data: any) {
    return apiClient.put(`${this.baseUrl}/api/items/${id}`, data)
  }

  async deleteItem(id: string) {
    return apiClient.delete(`${this.baseUrl}/api/items/${id}`)
  }

  async uploadFile(file: FormData) {
    return apiClient.post(`${this.baseUrl}/api/upload`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}

export const laravelAdapter = new LaravelAdapter()
