export type UserRole = 'student' | 'admin'

export interface Profile {
  id: string
  name: string | null
  email: string | null
  role: UserRole
  created_at: string
}
