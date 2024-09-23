import { useMutation } from '@tanstack/react-query'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
  ViewIcon,
  ViewOffIcon,
} from 'hugeicons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { InputWrapper } from '@/components/input-wrapper'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()
  const [showPassword, setShowPassword] = useState(false)

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })
  const navigate = useNavigate()
  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({
        email: data.email,
        password: data.password,
      })
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Card className="flex h-full flex-col justify-between px-10 pb-10 pt-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-titles text-title-md text-dark">
            Acesse sua conta
          </h1>
          <span className="font-sans text-body-sm">
            Informe seu e-mail e senha para entrar
          </span>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Label className="text-label-md uppercase" htmlFor="email">
            E-MAIL
          </Label>
          <InputWrapper>
            <Mail02Icon size={24} style={{ color: 'inherit' }} />
            <Input
              type="email"
              id="email"
              placeholder="Seu e-mail cadastrado"
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
              placeholder="Sua senha de acesso"
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
          <Button
            variant="default"
            type="submit"
            className="flex w-full justify-between"
            disabled={isSubmitting}
          >
            Acessar <ArrowRight02Icon size={24} style={{ color: 'inherit' }} />
          </Button>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-body-md">Ainda não tem uma conta?</span>
        <Button
          variant="outline"
          type="button"
          className="flex w-full justify-between"
          asChild
        >
          <Link to="/sign-up">
            Cadastrar{' '}
            <ArrowRight02Icon size={24} style={{ color: 'inherit' }} />
          </Link>
        </Button>
      </div>
    </Card>
  )
}
