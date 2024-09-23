import { zodResolver } from '@hookform/resolvers/zod'
import { Cancel01Icon, SaleTag02Icon, Search01Icon } from 'hugeicons-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { InputWrapper } from '../input-wrapper'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

const productsFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
})
type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const status = searchParams.get('status')
  const { register, handleSubmit, control, reset, watch } =
    useForm<ProductsFiltersSchema>({
      resolver: zodResolver(productsFiltersSchema),
      defaultValues: {
        search: search ?? '',
        status: status ?? '',
      },
    })
  const selectedStatus = watch('status')
  function handleFilter({ search, status }: ProductsFiltersSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }
      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }
      return state
    })
  }
  function handleClearStatus() {
    console.log('limpar')
    setSearchParams((state) => {
      state.delete('status')
      return state
    })
    reset({
      status: '',
    })
  }

  return (
    <Card className="space-y-6 p-8 ">
      <p className="text-title-sm">Filtrar</p>
      <form
        onSubmit={handleSubmit(handleFilter)}
        className="flex w-full flex-col gap-6"
      >
        <InputWrapper>
          <Search01Icon size={24} style={{ color: 'inherit' }} />
          <Input
            type="text"
            id="search"
            placeholder="Pesquisar"
            {...register('search')}
          />
        </InputWrapper>
        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => (
            <div className="relative">
              <Select
                defaultValue=""
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger>
                  <div
                    className={`flex w-full gap-3 ${selectedStatus ? 'text-primary' : 'text-foreground'}`}
                  >
                    <SaleTag02Icon size={24} style={{ color: 'inherit' }} />
                    <div className="text-foreground">
                      <SelectValue placeholder="Status" />
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Anunciado</SelectItem>
                  <SelectItem value="sold">Vendido</SelectItem>
                  <SelectItem value="disable">Desativado</SelectItem>
                </SelectContent>
              </Select>
              {selectedStatus ? (
                <div className="text-sm absolute right-8 top-2 flex h-5 w-5 items-center justify-between bg-background py-2">
                  <Cancel01Icon
                    className="hover:bg-text-medium flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-fill p-1"
                    type="button"
                    onClick={handleClearStatus}
                  />
                </div>
              ) : null}
            </div>
          )}
        />
        <Button className="mt-6 w-full" type="submit">
          Aplicar filtro
        </Button>
      </form>
    </Card>
  )
}

export { Filters }
