import { useNavigate } from 'react-router-dom'

import { Product } from '@/api/get-seller-produtcs'

import { StatusMappingType } from '../types'
import { Badge } from '../ui/badge'
import { Card } from '../ui/card'
const mapStatus: StatusMappingType = {
  sold: { color: 'bg-success', label: 'vendido' },
  cancelled: { color: 'bg-foreground', label: 'desativado' },
  available: { color: 'bg-blue-dark', label: 'anunciado' },
}

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()

  return (
    <Card
      className="grid grid-rows-2 gap-4 px-1 pb-6 pt-1"
      key={product.id}
      onClick={() =>
        navigate(`/products/${product.id}`, {
          state: {
            product,
          },
        })
      }
    >
      <div
        style={{
          backgroundImage: `url('${product.attachments[0].url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
        className="h-28 w-full rounded-md"
      >
        <Badge className="float-end m-1 bg-medium">
          <p className="text-label-sm uppercase text-white">
            {product.category.title}
          </p>
        </Badge>
        <Badge className={`float-end m-1 ${mapStatus[product.status].color}`}>
          <p className={`text-label-sm uppercase text-white `}>
            {mapStatus[product.status].label}
          </p>
        </Badge>
      </div>
      <div className="space-y-5 px-2">
        <div className="flex items-center justify-between text-dark">
          <p className="text-subtitle">{product.title}</p>

          <p className="text-title-sm text-dark">
            <span className="mr-1 text-label-md text-dark">R$</span>
            {product.priceInCents / 100}
          </p>
        </div>
        <p className="text-body-sm">{product.description}</p>
      </div>
    </Card>
  )
}

export { ProductCard }
