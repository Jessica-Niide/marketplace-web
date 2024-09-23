import { api } from '@/lib/axios'

export interface AvailableProductsResponse {
  amount: number
}

export async function getAvailableProductsMetrics() {
  const response = await api.get<AvailableProductsResponse>(
    '/sellers/metrics/products/available',
  )
  return response.data.amount
}
