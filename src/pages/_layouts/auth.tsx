import { Outlet } from 'react-router-dom'

import background from '@/assets/background.png'
import logo from '@/assets/logo.svg'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-scroll bg-background-custom">
      <div className="grid min-h-screen w-full max-w-[1500px] grid-cols-2 bg-background-custom">
        <div className="relative flex h-full flex-col justify-center p-10">
          <div className="fixed top-10 flex items-center gap-4">
            <img src={logo} alt="" className="w-[90px]" />
            <div>
              <p className="font-titles text-title-md text-dark">Marketplace</p>
              <p>Painel de Vendedor</p>
            </div>
          </div>
          <img
            src={background}
            alt=""
            className="fixed top-[50%] w-[100%] min-w-[400px] max-w-[600px] translate-y-[-50%]"
          />
        </div>
        <div className="z-10 flex h-full flex-col justify-center p-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
