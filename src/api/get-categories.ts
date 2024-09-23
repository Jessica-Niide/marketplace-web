import { api } from '@/lib/axios'
export interface CategoriesResponse {
  categories: {
    id: string
    title: string
    slug: string
  }[]
}

export async function getCategories() {
  const response = await api.get<CategoriesResponse>('/categories')

  return response.data?.categories
}
