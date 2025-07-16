export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  updatedAt?: string
}

export interface Item {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  userId?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface FileUpload {
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
  url?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface BackendAdapter {
  auth(email: string, password: string): Promise<any>
  register(email: string, password: string, name: string): Promise<any>
  logout(): Promise<void>
  getItems(): Promise<Item[]>
  createItem(item: Omit<Item, "id" | "createdAt">): Promise<Item>
  updateItem(id: string, updates: Partial<Item>): Promise<Item>
  deleteItem(id: string): Promise<void>
  uploadFile(file: File): Promise<{ url: string; path?: string }>
}
