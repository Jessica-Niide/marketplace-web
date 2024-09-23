import { useQuery } from '@tanstack/react-query'
import { SaleTag02Icon } from 'hugeicons-react'

import { getSoldProductsMetrics } from '@/api/sold-produtcs-metrics'
import { Card } from '@/components/ui/card'

const SoldProductsCard = () => {
  const { data } = useQuery({
    queryKey: ['sold-products'],
    queryFn: getSoldProductsMetrics,
  })
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className="flex h-24 w-20 items-center justify-center rounded-md bg-blue-light text-blue-dark">
        <SaleTag02Icon size={40} />
      </div>
      <div>
        <p className="font-titles text-title-lg text-medium">{data}</p>
        <p className="text-body-xs">Produtos vendidos</p>
      </div>
    </Card>
  )
}

export { SoldProductsCard }
