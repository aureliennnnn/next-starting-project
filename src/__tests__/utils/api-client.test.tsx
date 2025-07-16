import axios from "axios"
import { apiClient } from "@/lib/api-client"
import jest from "jest"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("ApiClient", () => {
  beforeEach(() => {
    mockedAxios.create.mockReturnValue({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("should create axios instance with correct config", () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  })

  it("should make GET request", async () => {
    const mockResponse = { data: "test" }
    const mockAxiosInstance = mockedAxios.create()
    mockAxiosInstance.get = jest.fn().mockResolvedValue(mockResponse)

    await apiClient.get("/test")

    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/test", undefined)
  })

  it("should make POST request", async () => {
    const mockResponse = { data: "test" }
    const mockData = { name: "test" }
    const mockAxiosInstance = mockedAxios.create()
    mockAxiosInstance.post = jest.fn().mockResolvedValue(mockResponse)

    await apiClient.post("/test", mockData)

    expect(mockAxiosInstance.post).toHaveBeenCalledWith("/test", mockData, undefined)
  })
})
