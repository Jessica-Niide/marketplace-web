import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ArrowLeft02Icon,
  Cancel01Icon,
  Tick02Icon,
  UnavailableIcon,
} from 'hugeicons-react'
import { Link, useLocation } from 'react-router-dom'

import { editProduct } from '@/api/edit-product'
import { getCategories } from '@/api/get-categories'
import { InputWrapper } from '@/components/input-wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'

export function Product() {
  const location = useLocation()
  const data = location.state
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  const { mutateAsync: edit } = useMutation({
    mutationFn: editProduct,
  })

  return (
    <div className="h-full w-full space-y-8  p-20">
      <div className="flex justify-between">
        <div>
          <Link
            to={'/products'}
            className="flex items-center gap-1 text-action-sm text-primary"
          >
            <ArrowLeft02Icon size={20} style={{ color: 'inherit' }} /> Voltar
          </Link>
          <h1 className="font-titles text-title-md text-dark">
            Editar produto
          </h1>
          <span className="text-body-sm">
            Gerencie as informações do produto cadastrado
          </span>
        </div>
        <div className="flex items-end gap-2">
          <Button
            variant="link"
            size="sm"
            className="flex items-center gap-2 text-primary"
          >
            <Tick02Icon size={20} /> Marcar como vendido
          </Button>
          <Button
            variant="link"
            size="sm"
            className="flex items-center gap-2 text-primary"
          >
            <UnavailableIcon size={20} />
            Desativar anúncio
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">
          <div
            style={{
              backgroundImage: `url('${data.product.attachments[0].url}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            className="h-[340px] w-full rounded-md"
          ></div>
        </div>
        <div className="col-span-3">
          <Card
            className="p-6"
            //   key={data.product[0].id}
          >
            <span>Dados do produto</span>
            <Badge className={`float-end`}>
              <p className={`text-label-sm uppercase text-white `}>
                {data.product.status}
              </p>
            </Badge>
            <form className="space-y-4">
              <div className="flex gap-2">
                <div className="grow">
                  <Label className="text-label-md uppercase" htmlFor="title">
                    Título
                  </Label>
                  <InputWrapper>
                    <Input
                      name="title"
                      id="title"
                      value={data.product.title}
                      className="px-0"
                    />
                  </InputWrapper>
                </div>
                <div>
                  <Label
                    className="text-label-md uppercase"
                    htmlFor="priceInCents"
                  >
                    Valor
                  </Label>
                  <InputWrapper>
                    <span className="mr-1 text-primary">R$</span>
                    <Input
                      name="priceInCents"
                      id="priceInCents"
                      value={data.product.priceInCents / 100}
                      className="px-0"
                    />
                  </InputWrapper>
                </div>
              </div>
              <div>
                <Label
                  className="text-label-md uppercase"
                  htmlFor="description"
                >
                  Descrição
                </Label>
                <InputWrapper>
                  <Input
                    name="description"
                    id="description"
                    value={data.product.description} // mudar p/ textarea
                    className="px-0"
                  />
                </InputWrapper>
              </div>
              <div>
                <Label htmlFor="category" className="text-label-md uppercase">
                  Categoria
                </Label>
                <InputWrapper>
                  <Select defaultValue={data.product.category.title}>
                    <SelectTrigger
                    // className={status ? 'text-primary' : 'text-foreground'}
                    >
                      <div className="flex w-full gap-3">
                        <div className="flex grow justify-between text-foreground">
                          <SelectValue />
                          {data.product.category ? (
                            <>
                              {/* <span>{data.product.category.title}</span> */}
                              <button
                                type="button"
                                className="mr-4 flex h-5 w-5 items-center justify-center rounded-full bg-fill hover:opacity-80"
                                onClick={(e) => console.log(e)}
                              >
                                {' '}
                                <Cancel01Icon
                                  size={14}
                                  style={{ color: 'inherit' }}
                                />{' '}
                              </button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </SelectTrigger>
                    <SelectContent className="overflow-auto">
                      {categories &&
                        categories.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </InputWrapper>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar e atualizar</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
