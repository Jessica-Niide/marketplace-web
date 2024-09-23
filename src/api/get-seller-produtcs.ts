import { StatusTypes } from '@/components/enums'
import { api } from '@/lib/axios'

export interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: StatusTypes
  owner: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: {
    id: string
    url: string
  }[]
}

export interface SellerProductsResponse {
  products: Product[]
}

export interface SellerProductsQuery {
  search?: string | null
  status?: string | null
}

export async function getSellerProducts({
  search,
  status,
}: SellerProductsQuery) {
  console.log('get seller', search, status)
  const response = await api.get<SellerProductsResponse>('/products/me', {
    params: {
      search,
      status,
    },
  })
  console.log('response get ', response)
  return response.data
}
