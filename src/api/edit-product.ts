import { StatusTypes } from '@/components/enums'
import { api } from '@/lib/axios'

import { ProductResponse } from './get-product'

export interface ProductBody {
  product: {
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
}

export async function editProduct(body: ProductBody) {
  console.log('get product ', id)
  if (!id) return null
  const response = await api.put<ProductResponse>(`/products/${id}`)

  return response.data
}
