import { api } from '@/lib/axios'

export interface ViewsResponse {
  amount: number
}

export async function getViewsMetrics() {
  const response = await api.get<ViewsResponse>('/sellers/metrics/views')
  return response.data.amount
}
