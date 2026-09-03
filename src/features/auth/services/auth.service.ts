import type { LoginCredentials, User, UserRole } from "../types/auth.types"

const MOCK_USERS: Record<UserRole, User> = {
  admin: {
    id: "usr-admin-001",
    name: "شام",
    email: "admin@redpower.com",
    role: "admin",
  },
  super_admin: {
    id: "usr-super-001",
    name: "شام",
    email: "super@redpower.com",
    role: "super_admin",
  },
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    const role: UserRole = credentials.email.includes("super")
      ? "super_admin"
      : "admin"

    return MOCK_USERS[role]
  },
}
