export type UserRole = "admin" | "super_admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface LoginCredentials {
  email: string
  password: string
}
