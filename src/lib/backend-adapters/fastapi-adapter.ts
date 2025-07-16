import { apiClient } from "../api-client"

export class FastAPIAdapter {
  private baseUrl: string

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_FASTAPI_API_URL || "") {
    this.baseUrl = baseUrl
  }

  async auth(email: string, password: string) {
    const formData = new FormData()
    formData.append("username", email)
    formData.append("password", password)

    return apiClient.post(`${this.baseUrl}/auth/token`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
    return apiClient.get(`${this.baseUrl}/auth/me`)
  }

  async logout() {
    return apiClient.post(`${this.baseUrl}/auth/logout`)
  }

  async getItems() {
    return apiClient.get(`${this.baseUrl}/items/`)
  }

  async createItem(data: any) {
    return apiClient.post(`${this.baseUrl}/items/`, data)
  }

  async updateItem(id: string, data: any) {
    return apiClient.put(`${this.baseUrl}/items/${id}`, data)
  }

  async deleteItem(id: string) {
    return apiClient.delete(`${this.baseUrl}/items/${id}`)
  }

  async uploadFile(file: FormData) {
    return apiClient.post(`${this.baseUrl}/upload/`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}

export const fastAPIAdapter = new FastAPIAdapter()
