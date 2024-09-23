import { StatusTypes } from '@/components/enums'
import { api } from '@/lib/axios'

export interface ProductResponse {
  product: {
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
}

export async function getProduct(id: string | undefined) {
  console.log('get product ', id)
  if (!id) return null
  const response = await api.get<ProductResponse>(
    `/products/aad2cce0-7737-4587-bac9-f73757565ab3`,
  )

  return response.data
}
