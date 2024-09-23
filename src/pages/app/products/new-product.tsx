import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Cancel01Icon, ImageUploadIcon } from 'hugeicons-react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { getCategories } from '@/api/get-categories'
import { InputWrapper } from '@/components/input-wrapper'
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
} from '../../../components/ui/select'

export function NewProduct() {
  const FILE_TYPES = ['image/png']

  const newProductForm = z.object({
    title: z.string(),
    categoryId: z.string(),
    description: z.string(),
    priceInCents: z.number(),
    file: z
      .custom<FileList>()
      .refine((files) => {
        return Array.from(files ?? []).length !== 0
      }, 'A imagem do produto é obrigatória.')
      .refine((files) => {
        return Array.from(files ?? []).every((file) =>
          FILE_TYPES.includes(file.type),
        )
      }, 'Tipo de arquivo precisa ser uma imagem PNG, JPEG, ooo...'),
  })

  type NewProductFormType = z.infer<typeof newProductForm>

  const { register, handleSubmit, watch, control } =
    useForm<NewProductFormType>({
      resolver: zodResolver(newProductForm),
    })

  const [imgData, setImgData] = useState<string | null>(null)
  const productImage = watch('file')

  useEffect(() => {
    if (productImage && productImage[0]) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setImgData(reader.result)
        }
      })
      reader.readAsDataURL(productImage[0])
    }
  }, [productImage])

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const handleCreateNewProduct = (data: NewProductFormType) => {
    console.log('click', data)
  }

  return (
    <div className="h-full w-full space-y-8  p-20">
      <div>
        <h1 className="font-titles text-title-md text-dark">Novo produto</h1>
        <span className="text-body-sm">
          Cadastre um produto para venda no marketplace
        </span>
      </div>
      <form
        className="grid grid-cols-5 gap-3"
        onSubmit={handleSubmit(handleCreateNewProduct)}
      >
        <div className="col-span-2">
          <Label
            className="flex h-[340px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-fill text-primary"
            htmlFor="file"
          >
            <Input
              type="file"
              id="file"
              className="hidden cursor-pointer"
              {...register('file')}
            />
            {imgData ? (
              <img src={imgData} alt="" />
            ) : (
              <ImageUploadIcon size={32} style={{ color: 'inherit' }} />
            )}
          </Label>
        </div>
        <div className="col-span-3">
          <Card className="p-6">
            <span>Dados do produto</span>
            <div className="flex gap-2">
              <div className="grow">
                <Label className="text-label-md uppercase" htmlFor="title">
                  Título
                </Label>
                <InputWrapper>
                  <Input
                    type="text"
                    id="title"
                    className="px-0"
                    {...register('title')}
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
                    type="number"
                    id="priceInCents"
                    {...register('priceInCents')}
                    className="px-0"
                  />
                </InputWrapper>
              </div>
            </div>
            <div>
              <Label className="text-label-md uppercase" htmlFor="description">
                Descrição
              </Label>
              <InputWrapper>
                <Input
                  type="text"
                  id="description"
                  className="px-0"
                  {...register('description')}
                />
              </InputWrapper>
            </div>
            <div>
              <Label htmlFor="category" className="text-label-md uppercase">
                Categoria
              </Label>
              <InputWrapper>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => (
                    <Select
                      defaultValue=""
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger>
                        <div className="flex w-full gap-3">
                          <div className="flex grow justify-between text-foreground">
                            <SelectValue />
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
                  )}
                />
              </InputWrapper>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit">Salvar e publicar</Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  )
}
