const API_BASE = 'https://dummyjson.com'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface UsersResponse {
  users: User[]
}

export const usersApi = {
  searchUsers: async (query: string): Promise<User[]> => {
    const response = await fetch(`${API_BASE}/users/search?q=${query}`)
    if (!response.ok) throw new Error('Failed to fetch users')
    const data = await response.json() as UsersResponse
    return data.users
  },
}