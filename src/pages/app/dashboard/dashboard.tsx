import { AvailableProductsCard } from '@/components/dashboard/available-products-card'
import { SoldProductsCard } from '@/components/dashboard/sold-products-card'
import { VisitorsCard } from '@/components/dashboard/visitors-card'
import { VisitorsChart } from '@/components/dashboard/visitors-chart'

export function Dashboard() {
  return (
    <div className="h-full w-full space-y-8  p-20">
      <div>
        <h1 className="font-titles text-title-md text-dark">Últimos 30 dias</h1>
        <span className="text-body-sm">
          Confira as estatísticas da sua loja no último mês
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1 flex flex-col justify-evenly gap-3">
          <SoldProductsCard />
          <AvailableProductsCard />
          <VisitorsCard />
        </div>
        <div className="col-span-3">
          <VisitorsChart />
        </div>
      </div>
    </div>
  )
}
