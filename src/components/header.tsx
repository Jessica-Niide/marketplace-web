import { useMutation } from '@tanstack/react-query'
import {
  ChartHistogramIcon,
  ImageUploadIcon,
  PackageIcon,
  PlusSignIcon,
} from 'hugeicons-react'
import { NavLink, useNavigate } from 'react-router-dom'

import { signOut } from '@/api/sign-out'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Header = () => {
  const navigate = useNavigate()

  const { mutateAsync: logout } = useMutation({
    mutationFn: signOut,
  })

  const handleSignOut = async () => {
    await logout()
    navigate('/sign-in')
  }
  return (
    <div className="m-auto grid h-20 w-full max-w-[1500px] grid-cols-3 items-center">
      <img src={logo} alt="" className="w-[52px]" />
      <div className="flex justify-center gap-5">
        <NavLink
          to="/"
          className={`flex h-10 items-center gap-2 rounded-md px-3 hover:text-primary active:bg-muted`}
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? 'hsl(0, 35.48%, 93.92%)' : '',
              color: isActive ? 'hsl(16.77 89.8% 50%)' : '',
            }
          }}
        >
          {' '}
          <ChartHistogramIcon size={24} /> Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className="flex h-10 items-center gap-2 rounded-md px-3 hover:text-primary active:bg-muted"
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? 'hsl(0, 35.48%, 93.92%)' : '',
              color: isActive ? 'hsl(16.77 89.8% 50%)' : '',
            }
          }}
        >
          <PackageIcon size={24} /> Produtos
        </NavLink>
      </div>
      <div className="flex items-center justify-end gap-5">
        <Button
          size={'sm'}
          className="flex gap-2"
          onClick={() => navigate('/new')}
        >
          <PlusSignIcon size={24} style={{ color: 'inherit' }} />
          <span>Novo produto</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-primary">
              <ImageUploadIcon size={24} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export { Header }
