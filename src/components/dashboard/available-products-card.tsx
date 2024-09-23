import { useQuery } from '@tanstack/react-query'
import { Store04Icon } from 'hugeicons-react'

import { getAvailableProductsMetrics } from '@/api/available-produtcs-metrics'
import { Card } from '@/components/ui/card'

const AvailableProductsCard = () => {
  const { data } = useQuery({
    queryKey: ['available-products'],
    queryFn: getAvailableProductsMetrics,
  })
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="flex h-24 w-20 items-center justify-center rounded-md bg-blue-light text-blue-dark">
        <Store04Icon size={40} />
      </div>
      <div>
        <p className="font-titles text-title-lg text-medium">{data}</p>
        <p className="text-body-xs">Produtos anunciados</p>
      </div>
    </Card>
  )
}

export { AvailableProductsCard }
