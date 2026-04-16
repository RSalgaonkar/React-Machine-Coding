const API_BASE = 'https://dummyjson.com'

// Existing users API...
export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

// NEW: Products API with pagination
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export const api = {
  // Users
  searchUsers: async (query: string): Promise<User[]> => {
    const response = await fetch(`${API_BASE}/users/search?q=${query}`)
    if (!response.ok) throw new Error('Failed to fetch users')
    const data = await response.json() as UsersResponse
    return data.users
  },

  // Products - Infinite Query Support
  getProducts: async ({ pageParam = 0 }: { pageParam?: number }): Promise<ProductsResponse> => {
    const response = await fetch(`${API_BASE}/products?limit=10&skip=${pageParam * 10}`)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  },

  // Single Product (Dependent Query)
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return response.json()
  },

  // Categories (Dependent on Products)
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE}/products/categories`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    const categories = await response.json()
    return categories
  },
}