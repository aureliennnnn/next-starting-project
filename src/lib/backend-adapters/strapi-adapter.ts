import { apiClient } from "../api-client"

export class StrapiAdapter {
  private baseUrl: string

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_STRAPI_API_URL || "") {
    this.baseUrl = baseUrl
  }

  async auth(email: string, password: string) {
    return apiClient.post(`${this.baseUrl}/api/auth/local`, {
      identifier: email,
      password,
    })
  }

  async register(name: string, email: string, password: string) {
    return apiClient.post(`${this.baseUrl}/api/auth/local/register`, {
      username: name,
      email,
      password,
    })
  }

  async getUser() {
    return apiClient.get(`${this.baseUrl}/api/users/me`)
  }

  async logout() {
    // Strapi doesn't have a logout endpoint, just remove token client-side
    return Promise.resolve()
  }

  async getItems() {
    return apiClient.get(`${this.baseUrl}/api/items?populate=*`)
  }

  async createItem(data: any) {
    return apiClient.post(`${this.baseUrl}/api/items`, {
      data,
    })
  }

  async updateItem(id: string, data: any) {
    return apiClient.put(`${this.baseUrl}/api/items/${id}`, {
      data,
    })
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

export const strapiAdapter = new StrapiAdapter()
