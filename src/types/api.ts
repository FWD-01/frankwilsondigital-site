export interface DemoRequestBody {
  name: string
  email: string
  business: string
  message?: string
}

export interface ContactBody {
  name: string
  email: string
  message: string
}

export interface ApiSuccess {
  success: true
}

export interface ApiError {
  success: false
  error: string
}

export type ApiResponse = ApiSuccess | ApiError
