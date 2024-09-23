import { api } from '@/lib/axios'

export interface ViewsPerDay {
  date: Date
  amount: number
}

export interface ViewsPerDayResponse {
  viewsPerDay: ViewsPerDay[]
}

export async function getViewsPerDayMetrics() {
  const response = await api.get<ViewsPerDayResponse>(
    '/sellers/metrics/views/days',
  )
  return response.data.viewsPerDay
}
