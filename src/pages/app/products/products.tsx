import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getSellerProducts } from '@/api/get-seller-produtcs'
import { Filters } from '@/components/products/filter'
import { ProductCard } from '@/components/products/product-card'

export function Products() {
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const { data } = useQuery({
    queryKey: ['products', search, status],
    queryFn: () =>
      getSellerProducts({
        search,
        status,
      }),
  })

  return (
    <div className="h-full w-full space-y-8  p-20">
      <div>
        <h1 className="font-titles text-title-md text-dark">Seus produtos</h1>
        <span className="text-body-sm">
          Acesse gerencie a sua lista de produtos à venda
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <Filters />
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {data &&
            data.products &&
            data.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </div>
    </div>
  )
}
