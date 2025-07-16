import { apiClient } from "../api-client"

export class NestJSAdapter {
  private baseUrl: string

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_NESTJS_API_URL || "") {
    this.baseUrl = baseUrl
  }

  async auth(email: string, password: string) {
    return apiClient.post(`${this.baseUrl}/auth/login`, {
      email,
      password,
    })
  }

  async register(name: string, email: string, password: string) {
    return apiClient.post(`${this.baseUrl}/auth/register`, {
      name,
      email,
      password,
    })
  }

  async getUser() {
    return apiClient.get(`${this.baseUrl}/auth/profile`)
  }

  async logout() {
    return apiClient.post(`${this.baseUrl}/auth/logout`)
  }

  async refreshToken() {
    return apiClient.post(`${this.baseUrl}/auth/refresh`)
  }

  async getItems() {
    return apiClient.get(`${this.baseUrl}/items`)
  }

  async createItem(data: any) {
    return apiClient.post(`${this.baseUrl}/items`, data)
  }

  async updateItem(id: string, data: any) {
    return apiClient.patch(`${this.baseUrl}/items/${id}`, data)
  }

  async deleteItem(id: string) {
    return apiClient.delete(`${this.baseUrl}/items/${id}`)
  }

  async uploadFile(file: FormData) {
    return apiClient.post(`${this.baseUrl}/upload`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}

export const nestJSAdapter = new NestJSAdapter()
