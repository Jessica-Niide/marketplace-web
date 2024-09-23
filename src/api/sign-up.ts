import { api } from '@/lib/axios'

export interface SignUpBody {
  name: string
  phone: string
  email: string
  avatarId: string | null
  password: string
  passwordConfirmation: string
}

export interface SignUpResponse {
  status: number
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
}

export async function signUp({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: SignUpBody) {
  const data = await api.post<SignUpResponse>('/sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })

  return data
}
