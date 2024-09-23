import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  ImageUploadIcon,
  Mail02Icon,
  UserIcon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { uploadAttachments } from '@/api/upload-attachments'
import { InputWrapper } from '@/components/input-wrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUp() {
  const FILE_TYPES = ['image/png']

  const signUpForm = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    password: z.string(),
    passwordConfirmation: z.string(),
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

  type SignUpFormType = z.infer<typeof signUpForm>
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpForm),
  })
  const [imgData, setImgData] = useState<string | null>(null)
  const profilePicture = watch('file')
  useEffect(() => {
    if (profilePicture && profilePicture[0]) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          setImgData(reader.result)
        }
      })
      reader.readAsDataURL(profilePicture[0])
    }
  }, [profilePicture])

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const { mutateAsync: uploadProfilePicture } = useMutation({
    mutationFn: uploadAttachments,
  })

  const { mutateAsync: signUpSeller } = useMutation({
    mutationFn: signUp,
  })

  async function handleUploadProfilePicture(file: FileList) {
    let avatarId = null
    if (file && file.length > 0) {
      const files = new FormData()
      files.append('file', file[0])
      const uploadedPicture = await uploadProfilePicture(files)
      if (uploadedPicture && uploadedPicture) {
        avatarId = uploadedPicture.id
      }
    }
    return avatarId
  }

  const navigate = useNavigate()

  async function handleSignUp(data: SignUpFormType) {
    try {
      const avatarId = await handleUploadProfilePicture(data.file)
      const newSeller = await signUpSeller({
        email: data.email,
        name: data.name,
        phone: data.phone,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        avatarId,
      })
      if (newSeller.status === 201) {
        toast.success(
          'Cadastro realizado com sucesso. Faça login para começar a vender.',
          {
            action: {
              label: 'login',
              onClick: () => {
                navigate('/sign-in')
              },
            },
          },
        )
      }
    } catch (err) {
      toast.error('Não foi possível realizar o cadastro.')
    }
  }
  return (
    <Card className="flex h-full flex-col justify-between gap-20 px-10 py-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-titles text-title-md text-dark">
            Crie sua conta
          </h1>
          <span className="font-sans text-body-sm">
            Informe seu e-mail e senha para entrar
          </span>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <span className="font-titles text-title-sm text-dark ">Perfil</span>
          <Label
            className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border bg-fill text-primary"
            htmlFor="file"
          >
            <ImageUploadIcon size={32} style={{ color: 'inherit' }} />
            <Input
              type="file"
              id="file"
              className="hidden cursor-pointer"
              {...register('file')}
            />
            {imgData && <img src={imgData} alt="" />}
          </Label>
          <Label className="text-label-md uppercase" htmlFor="name">
            NOME
          </Label>
          <InputWrapper>
            <UserIcon size={24} style={{ color: 'inherit' }} />
            <Input
              type="text"
              id="name"
              placeholder="Seu nome completo"
              {...register('name')}
            />
          </InputWrapper>
          <Label className="text-label-md uppercase" htmlFor="phone">
            TELEFONE
          </Label>
          <InputWrapper>
            <CallIcon size={24} style={{ color: 'inherit' }} />
            <Input
              type="tel"
              id="phone"
              placeholder="(00) 00000-0000"
              {...register('phone')}
            />
          </InputWrapper>
          <span className="mt-12 font-titles text-title-sm text-dark">
            Acesso
          </span>
          <Label className="text-label-md uppercase" htmlFor="email">
            E-MAIL
          </Label>
          <InputWrapper>
            <Mail02Icon size={24} style={{ color: 'inherit' }} />
            <Input
              type="email"
              id="email"
              placeholder="Seu e-mail de acesso"
              {...register('email')}
            />
          </InputWrapper>
          <Label className="text-label-md uppercase" htmlFor="password">
            SENHA
          </Label>
          <InputWrapper>
            <AccessIcon size={24} style={{ color: 'inherit' }} />
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Senha de acesso"
              {...register('password')}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <ViewIcon size={24} aria-hidden="true" />
              ) : (
                <ViewOffIcon size={24} aria-hidden="true" />
              )}
            </Button>
          </InputWrapper>
          <Label className="text-label-md uppercase" htmlFor="confirmPassword">
            CONFIRME A SENHA
          </Label>
          <InputWrapper>
            <AccessIcon size={24} style={{ color: 'inherit' }} />
            <Input
              type={showPasswordConfirmation ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirme a senha"
              {...register('passwordConfirmation')}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPasswordConfirmation((prev) => !prev)}
            >
              {showPasswordConfirmation ? (
                <ViewIcon size={24} aria-hidden="true" />
              ) : (
                <ViewOffIcon size={24} aria-hidden="true" />
              )}
            </Button>
          </InputWrapper>
          <Button
            variant="default"
            type="submit"
            className="mt-12 flex w-full justify-between"
            disabled={isSubmitting}
          >
            Cadastrar{' '}
            <ArrowRight02Icon size={24} style={{ color: 'inherit' }} />
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <span>Já tem uma conta?</span>
        <Button
          variant="outline"
          type="button"
          className="flex w-full justify-between"
          asChild
        >
          <Link to="/sign-in">
            Acessar <ArrowRight02Icon size={24} style={{ color: 'inherit' }} />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
