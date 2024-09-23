import { api } from '@/lib/axios'

export interface SoldProductsResponse {
  amount: number
}

export async function getSoldProductsMetrics() {
  const response = await api.get<SoldProductsResponse>(
    '/sellers/metrics/products/sold',
  )
  return response.data.amount
}
