import { useQuery } from '@tanstack/react-query'
import { UserMultipleIcon } from 'hugeicons-react'

import { getViewsMetrics } from '@/api/views-metrics'
import { Card } from '@/components/ui/card'

const VisitorsCard = () => {
  const { data } = useQuery({
    queryKey: ['views'],
    queryFn: getViewsMetrics,
  })
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="flex h-24 w-20 items-center justify-center rounded-md bg-blue-light text-blue-dark">
        <UserMultipleIcon size={40} />
      </div>
      <div>
        <p className="font-titles text-title-lg text-medium">{data}</p>
        <p className="text-body-xs">Pessoas visitantes</p>
      </div>
    </Card>
  )
}

export { VisitorsCard }
